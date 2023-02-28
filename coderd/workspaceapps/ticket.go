package workspaceapps

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
	"golang.org/x/xerrors"
	"gopkg.in/square/go-jose.v2"
)

// Ticket is the struct data contained inside a workspace app ticket JWE. It
// contains the details of the workspace app that the ticket is valid for to
// avoid database queries.
//
// The JSON field names are short to reduce the size of the ticket.
type Ticket struct {
	// Request details.
	AccessMethod      AccessMethod `json:"access_method"`
	UsernameOrID      string       `json:"username_or_id"`
	WorkspaceNameOrID string       `json:"workspace_name_or_id"`
	AgentNameOrID     string       `json:"agent_name_or_id"`
	AppSlugOrPort     string       `json:"app_slug_or_port"`

	// Trusted resolved details.
	Expiry      int64     `json:"expiry"` // set by generateWorkspaceAppTicket
	UserID      uuid.UUID `json:"user_id"`
	WorkspaceID uuid.UUID `json:"workspace_id"`
	AgentID     uuid.UUID `json:"agent_id"`
	AppURL      string    `json:"app_url"`
}

func (t Ticket) MatchesRequest(req Request) bool {
	return t.AccessMethod == req.AccessMethod &&
		t.UsernameOrID == req.UsernameOrID &&
		t.WorkspaceNameOrID == req.WorkspaceNameOrID &&
		t.AgentNameOrID == req.AgentNameOrID &&
		t.AppSlugOrPort == req.AppSlugOrPort
}

func (p *Provider) GenerateTicket(payload Ticket) (string, error) {
	payload.Expiry = time.Now().Add(1 * time.Minute).Unix()
	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return "", xerrors.Errorf("marshal payload to JSON: %w", err)
	}

	// We use symmetric signing with an RSA key to support satellites in the
	// future.
	signer, err := jose.NewSigner(jose.SigningKey{Algorithm: jose.PS512, Key: p.TicketSigningKey}, nil)
	if err != nil {
		return "", xerrors.Errorf("create signer: %w", err)
	}

	signedObject, err := signer.Sign(payloadBytes)
	if err != nil {
		return "", xerrors.Errorf("sign payload: %w", err)
	}

	serialized, err := signedObject.CompactSerialize()
	if err != nil {
		return "", xerrors.Errorf("serialize JWS: %w", err)
	}

	return serialized, nil
}

func (p *Provider) ParseTicket(ticketStr string) (Ticket, error) {
	object, err := jose.ParseSigned(ticketStr)
	if err != nil {
		return Ticket{}, xerrors.Errorf("parse JWS: %w", err)
	}

	output, err := object.Verify(&p.TicketSigningKey.PublicKey)
	if err != nil {
		return Ticket{}, xerrors.Errorf("verify JWS: %w", err)
	}

	var ticket Ticket
	err = json.Unmarshal(output, &ticket)
	if err != nil {
		return Ticket{}, xerrors.Errorf("unmarshal payload: %w", err)
	}
	if ticket.Expiry < time.Now().Unix() {
		return Ticket{}, xerrors.New("ticket expired")
	}

	return ticket, nil
}