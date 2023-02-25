package bigcli

import (
	"strings"

	"github.com/hashicorp/go-multierror"
	"github.com/iancoleman/strcase"
	"github.com/spf13/pflag"
	"golang.org/x/xerrors"
)

const Disable = "-"

// Option is a configuration option for a CLI application.
type Option struct {
	Name  string
	Usage string

	// If unset, Flag defaults to the kebab-case version of Name.
	// Use special value "Disable" to disable flag support.
	Flag string

	FlagShorthand string

	// If unset, Env defaults to the upper-case, snake-case version of Name.
	// Use special value "Disable" to disable environment variable support.
	Env string

	// Default is parsed into Value if set.
	Default string
	Value   pflag.Value

	// Annotations can be anything and everything you want. It's useful for
	// help formatting and documentation generation.
	Annotations map[string]string
	Hidden      bool
}

func (o *Option) FlagName() (string, bool) {
	if o.Flag == Disable {
		return "", false
	}
	if o.Flag == "" {
		return strcase.ToKebab(o.Name), true
	}
	return o.Flag, true
}

// EnvName returns the environment variable name for the option.
func (o *Option) EnvName() (string, bool) {
	if o.Env != "" {
		if o.Env == Disable {
			return "", false
		}
		return o.Env, true
	}
	return strings.ToUpper(strcase.ToSnake(o.Name)), true
}

// OptionSet is a group of options that can be applied to a command.
type OptionSet []Option

// Add adds the given Options to the OptionSet.
func (os *OptionSet) Add(opts ...Option) {
	*os = append(*os, opts...)
}

// ParseFlags parses the given os.Args style arguments into the OptionSet.
func (os *OptionSet) ParseFlags(args ...string) error {
	fs := pflag.NewFlagSet("", pflag.ContinueOnError)
	for _, opt := range *os {
		flagName, ok := opt.FlagName()
		if !ok {
			continue
		}
		fs.AddFlag(&pflag.Flag{
			Name:        flagName,
			Shorthand:   opt.FlagShorthand,
			Usage:       opt.Usage,
			Value:       opt.Value,
			DefValue:    "",
			Changed:     false,
			NoOptDefVal: "",
			Deprecated:  "",
			Hidden:      opt.Hidden,
		})
	}
	return fs.Parse(args)
}

// ParseEnv parses the given environment variables into the OptionSet.
func (os *OptionSet) ParseEnv(globalPrefix string, environ []string) error {
	var merr *multierror.Error

	// We parse environment variables first instead of using a nested loop to
	// avoid N*M complexity when there are a lot of options and environment
	// variables.
	envs := make(map[string]string)
	for _, env := range environ {
		env = strings.TrimPrefix(env, globalPrefix)
		if len(env) == 0 {
			continue
		}

		tokens := strings.Split(env, "=")
		if len(tokens) != 2 {
			return xerrors.Errorf("invalid env %q", env)
		}
		envs[tokens[0]] = tokens[1]
	}

	for _, opt := range *os {
		envName, ok := opt.EnvName()
		if !ok {
			continue
		}

		envVal, ok := envs[envName]
		if !ok {
			continue
		}

		if err := opt.Value.Set(envVal); err != nil {
			merr = multierror.Append(
				merr, xerrors.Errorf("parse %q: %w", opt.Name, err),
			)
		}
	}

	return merr.ErrorOrNil()
}

// SetDefaults sets the default values for each Option.
// It should be called after all parsing (e.g. ParseFlags, ParseEnv, ParseConfig).
func (os *OptionSet) SetDefaults() error {
	var merr *multierror.Error
	for _, opt := range *os {
		if opt.Default == "" {
			continue
		}
		if err := opt.Value.Set(opt.Default); err != nil {
			merr = multierror.Append(
				merr, xerrors.Errorf("parse %q: %w", opt.Name, err),
			)
		}
	}
	return merr.ErrorOrNil()
}
