// Code generated by 'make site/src/api/typesGenerated.ts'. DO NOT EDIT.

// From codersdk/apikey.go
export interface APIKey {
  readonly id: string
  readonly user_id: string
  readonly last_used: string
  readonly expires_at: string
  readonly created_at: string
  readonly updated_at: string
  readonly login_type: LoginType
  readonly scope: APIKeyScope
  readonly token_name: string
  readonly lifetime_seconds: number
}

// From codersdk/apikey.go
export interface APIKeyWithOwner extends APIKey {
  readonly username: string
}

// From codersdk/licenses.go
export interface AddLicenseRequest {
  readonly license: string
}

// From codersdk/templates.go
export interface AgentStatsReportResponse {
  readonly num_comms: number
  readonly rx_bytes: number
  readonly tx_bytes: number
}

// From codersdk/deployment.go
export interface AppHostResponse {
  readonly host: string
}

// From codersdk/deployment.go
export interface AppearanceConfig {
  readonly logo_url: string
  readonly service_banner: ServiceBannerConfig
  readonly support_links?: LinkConfig[]
}

// From codersdk/roles.go
export interface AssignableRoles extends Role {
  readonly assignable: boolean
}

// From codersdk/audit.go
export type AuditDiff = Record<string, AuditDiffField>

// From codersdk/audit.go
export interface AuditDiffField {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO explain why this is needed
  readonly old?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO explain why this is needed
  readonly new?: any
  readonly secret: boolean
}

// From codersdk/audit.go
export interface AuditLog {
  readonly id: string
  readonly request_id: string
  readonly time: string
  readonly organization_id: string
  // Named type "net/netip.Addr" unknown, using "any"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO explain why this is needed
  readonly ip: any
  readonly user_agent: string
  readonly resource_type: ResourceType
  readonly resource_id: string
  readonly resource_target: string
  readonly resource_icon: string
  readonly action: AuditAction
  readonly diff: AuditDiff
  readonly status_code: number
  readonly additional_fields: Record<string, string>
  readonly description: string
  readonly resource_link: string
  readonly is_deleted: boolean
  readonly user?: User
}

// From codersdk/audit.go
export interface AuditLogResponse {
  readonly audit_logs: AuditLog[]
  readonly count: number
}

// From codersdk/audit.go
export interface AuditLogsRequest extends Pagination {
  readonly q?: string
}

// From codersdk/users.go
export interface AuthMethod {
  readonly enabled: boolean
}

// From codersdk/users.go
export interface AuthMethods {
  readonly password: AuthMethod
  readonly github: AuthMethod
  readonly oidc: OIDCAuthMethod
}

// From codersdk/authorization.go
export interface AuthorizationCheck {
  readonly object: AuthorizationObject
  readonly action: string
}

// From codersdk/authorization.go
export interface AuthorizationObject {
  readonly resource_type: string
  readonly owner_id?: string
  readonly organization_id?: string
  readonly resource_id?: string
}

// From codersdk/authorization.go
export interface AuthorizationRequest {
  readonly checks: Record<string, AuthorizationCheck>
}

// From codersdk/authorization.go
export type AuthorizationResponse = Record<string, boolean>

// From codersdk/deployment.go
export interface BuildInfoResponse {
  readonly external_url: string
  readonly version: string
}

// From codersdk/parameters.go
export interface ComputedParameter extends Parameter {
  readonly source_value: string
  readonly schema_id: string
  readonly default_source_value: boolean
}

// From codersdk/users.go
export interface CreateFirstUserRequest {
  readonly email: string
  readonly username: string
  readonly password: string
  readonly trial: boolean
}

// From codersdk/users.go
export interface CreateFirstUserResponse {
  readonly user_id: string
  readonly organization_id: string
}

// From codersdk/groups.go
export interface CreateGroupRequest {
  readonly name: string
  readonly avatar_url: string
  readonly quota_allowance: number
}

// From codersdk/users.go
export interface CreateOrganizationRequest {
  readonly name: string
}

// From codersdk/parameters.go
export interface CreateParameterRequest {
  readonly copy_from_parameter?: string
  readonly name: string
  readonly source_value: string
  readonly source_scheme: ParameterSourceScheme
  readonly destination_scheme: ParameterDestinationScheme
}

// From codersdk/organizations.go
export interface CreateTemplateRequest {
  readonly name: string
  readonly display_name?: string
  readonly description?: string
  readonly icon?: string
  readonly template_version_id: string
  readonly parameter_values?: CreateParameterRequest[]
  readonly default_ttl_ms?: number
  readonly allow_user_cancel_workspace_jobs?: boolean
}

// From codersdk/templateversions.go
export interface CreateTemplateVersionDryRunRequest {
  readonly workspace_name: string
  readonly parameter_values: CreateParameterRequest[]
  readonly rich_parameter_values: WorkspaceBuildParameter[]
  readonly user_variable_values?: VariableValue[]
}

// From codersdk/organizations.go
export interface CreateTemplateVersionRequest {
  readonly name?: string
  readonly template_id?: string
  readonly storage_method: ProvisionerStorageMethod
  readonly file_id?: string
  readonly example_id?: string
  readonly provisioner: ProvisionerType
  readonly tags: Record<string, string>
  readonly parameter_values?: CreateParameterRequest[]
  readonly user_variable_values?: VariableValue[]
}

// From codersdk/audit.go
export interface CreateTestAuditLogRequest {
  readonly action?: AuditAction
  readonly resource_type?: ResourceType
  readonly resource_id?: string
  readonly additional_fields?: Record<string, string>
  readonly time?: string
  readonly build_reason?: BuildReason
}

// From codersdk/apikey.go
export interface CreateTokenRequest {
  // This is likely an enum in an external package ("time.Duration")
  readonly lifetime: number
  readonly scope: APIKeyScope
  readonly token_name: string
}

// From codersdk/users.go
export interface CreateUserRequest {
  readonly email: string
  readonly username: string
  readonly password: string
  readonly organization_id: string
}

// From codersdk/workspaces.go
export interface CreateWorkspaceBuildRequest {
  readonly template_version_id?: string
  readonly transition: WorkspaceTransition
  readonly dry_run?: boolean
  readonly state?: string
  readonly orphan?: boolean
  readonly parameter_values?: CreateParameterRequest[]
  readonly rich_parameter_values?: WorkspaceBuildParameter[]
}

// From codersdk/organizations.go
export interface CreateWorkspaceRequest {
  readonly template_id: string
  readonly name: string
  readonly autostart_schedule?: string
  readonly ttl_ms?: number
  readonly parameter_values?: CreateParameterRequest[]
  readonly rich_parameter_values?: WorkspaceBuildParameter[]
}

// From codersdk/templates.go
export interface DAUEntry {
  readonly date: string
  readonly amount: number
}

// From codersdk/deployment.go
export interface DERP {
  readonly server: DERPServerConfig
  readonly config: DERPConfig
}

// From codersdk/deployment.go
export interface DERPConfig {
  readonly url: DeploymentConfigField<string>
  readonly path: DeploymentConfigField<string>
}

// From codersdk/workspaceagents.go
export interface DERPRegion {
  readonly preferred: boolean
  readonly latency_ms: number
}

// From codersdk/deployment.go
export interface DERPServerConfig {
  readonly enable: DeploymentConfigField<boolean>
  readonly region_id: DeploymentConfigField<number>
  readonly region_code: DeploymentConfigField<string>
  readonly region_name: DeploymentConfigField<string>
  readonly stun_addresses: DeploymentConfigField<string[]>
  readonly relay_url: DeploymentConfigField<string>
}

// From codersdk/deployment.go
export interface DangerousConfig {
  readonly allow_path_app_sharing: DeploymentConfigField<boolean>
  readonly allow_path_app_site_owner_access: DeploymentConfigField<boolean>
}

// From codersdk/deployment.go
export interface DeploymentConfig {
  readonly access_url: DeploymentConfigField<string>
  readonly wildcard_access_url: DeploymentConfigField<string>
  readonly redirect_to_access_url: DeploymentConfigField<boolean>
  readonly http_address: DeploymentConfigField<string>
  readonly autobuild_poll_interval: DeploymentConfigField<number>
  readonly derp: DERP
  readonly gitauth: DeploymentConfigField<GitAuthConfig[]>
  readonly prometheus: PrometheusConfig
  readonly pprof: PprofConfig
  readonly proxy_trusted_headers: DeploymentConfigField<string[]>
  readonly proxy_trusted_origins: DeploymentConfigField<string[]>
  readonly cache_directory: DeploymentConfigField<string>
  readonly in_memory_database: DeploymentConfigField<boolean>
  readonly pg_connection_url: DeploymentConfigField<string>
  readonly oauth2: OAuth2Config
  readonly oidc: OIDCConfig
  readonly telemetry: TelemetryConfig
  readonly tls: TLSConfig
  readonly trace: TraceConfig
  readonly secure_auth_cookie: DeploymentConfigField<boolean>
  readonly strict_transport_security: DeploymentConfigField<number>
  readonly strict_transport_security_options: DeploymentConfigField<string[]>
  readonly ssh_keygen_algorithm: DeploymentConfigField<string>
  readonly metrics_cache_refresh_interval: DeploymentConfigField<number>
  readonly agent_stat_refresh_interval: DeploymentConfigField<number>
  readonly agent_fallback_troubleshooting_url: DeploymentConfigField<string>
  readonly audit_logging: DeploymentConfigField<boolean>
  readonly browser_only: DeploymentConfigField<boolean>
  readonly scim_api_key: DeploymentConfigField<string>
  readonly provisioner: ProvisionerConfig
  readonly rate_limit: RateLimitConfig
  readonly experiments: DeploymentConfigField<string[]>
  readonly update_check: DeploymentConfigField<boolean>
  readonly max_token_lifetime: DeploymentConfigField<number>
  readonly swagger: SwaggerConfig
  readonly logging: LoggingConfig
  readonly dangerous: DangerousConfig
  readonly disable_path_apps: DeploymentConfigField<boolean>
  readonly max_session_expiry: DeploymentConfigField<number>
  readonly disable_session_expiry_refresh: DeploymentConfigField<boolean>
  readonly disable_password_auth: DeploymentConfigField<boolean>
  readonly insecure_app_signing_key_file: DeploymentConfigField<string>
  readonly address: DeploymentConfigField<string>
  readonly experimental: DeploymentConfigField<boolean>
  readonly support: SupportConfig
}

// From codersdk/deployment.go
export interface DeploymentConfigField<T extends Flaggable> {
  readonly name: string
  readonly usage: string
  readonly flag: string
  readonly shorthand: string
  readonly enterprise: boolean
  readonly hidden: boolean
  readonly secret: boolean
  readonly default: T
  readonly value: T
}

// From codersdk/deployment.go
export interface DeploymentDAUsResponse {
  readonly entries: DAUEntry[]
}

// From codersdk/deployment.go
export interface Entitlements {
  readonly features: Record<FeatureName, Feature>
  readonly warnings: string[]
  readonly errors: string[]
  readonly has_license: boolean
  readonly trial: boolean
  readonly require_telemetry: boolean
  readonly experimental: boolean
}

// From codersdk/deployment.go
export type Experiments = Experiment[]

// From codersdk/deployment.go
export interface Feature {
  readonly entitlement: Entitlement
  readonly enabled: boolean
  readonly limit?: number
  readonly actual?: number
}

// From codersdk/apikey.go
export interface GenerateAPIKeyResponse {
  readonly key: string
}

// From codersdk/users.go
export interface GetUsersResponse {
  readonly users: User[]
  readonly count: number
}

// From codersdk/deployment.go
export interface GitAuthConfig {
  readonly id: string
  readonly type: string
  readonly client_id: string
  readonly auth_url: string
  readonly token_url: string
  readonly validate_url: string
  readonly regex: string
  readonly no_refresh: boolean
  readonly scopes: string[]
}

// From codersdk/gitsshkey.go
export interface GitSSHKey {
  readonly user_id: string
  readonly created_at: string
  readonly updated_at: string
  readonly public_key: string
}

// From codersdk/groups.go
export interface Group {
  readonly id: string
  readonly name: string
  readonly organization_id: string
  readonly members: User[]
  readonly avatar_url: string
  readonly quota_allowance: number
}

// From codersdk/workspaceapps.go
export interface Healthcheck {
  readonly url: string
  readonly interval: number
  readonly threshold: number
}

// From codersdk/licenses.go
export interface License {
  readonly id: number
  readonly uuid: string
  readonly uploaded_at: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO explain why this is needed
  readonly claims: Record<string, any>
}

// From codersdk/deployment.go
export interface LinkConfig {
  readonly name: string
  readonly target: string
  readonly icon: string
}

// From codersdk/deployment.go
export interface LoggingConfig {
  readonly human: DeploymentConfigField<string>
  readonly json: DeploymentConfigField<string>
  readonly stackdriver: DeploymentConfigField<string>
}

// From codersdk/users.go
export interface LoginWithPasswordRequest {
  readonly email: string
  readonly password: string
}

// From codersdk/users.go
export interface LoginWithPasswordResponse {
  readonly session_token: string
}

// From codersdk/deployment.go
export interface OAuth2Config {
  readonly github: OAuth2GithubConfig
}

// From codersdk/deployment.go
export interface OAuth2GithubConfig {
  readonly client_id: DeploymentConfigField<string>
  readonly client_secret: DeploymentConfigField<string>
  readonly allowed_orgs: DeploymentConfigField<string[]>
  readonly allowed_teams: DeploymentConfigField<string[]>
  readonly allow_signups: DeploymentConfigField<boolean>
  readonly allow_everyone: DeploymentConfigField<boolean>
  readonly enterprise_base_url: DeploymentConfigField<string>
}

// From codersdk/users.go
export interface OIDCAuthMethod extends AuthMethod {
  readonly signInText: string
  readonly iconUrl: string
}

// From codersdk/deployment.go
export interface OIDCConfig {
  readonly allow_signups: DeploymentConfigField<boolean>
  readonly client_id: DeploymentConfigField<string>
  readonly client_secret: DeploymentConfigField<string>
  readonly email_domain: DeploymentConfigField<string[]>
  readonly issuer_url: DeploymentConfigField<string>
  readonly scopes: DeploymentConfigField<string[]>
  readonly ignore_email_verified: DeploymentConfigField<boolean>
  readonly username_field: DeploymentConfigField<string>
  readonly sign_in_text: DeploymentConfigField<string>
  readonly icon_url: DeploymentConfigField<string>
}

// From codersdk/organizations.go
export interface Organization {
  readonly id: string
  readonly name: string
  readonly created_at: string
  readonly updated_at: string
}

// From codersdk/organizations.go
export interface OrganizationMember {
  readonly user_id: string
  readonly organization_id: string
  readonly created_at: string
  readonly updated_at: string
  readonly roles: Role[]
}

// From codersdk/pagination.go
export interface Pagination {
  readonly after_id?: string
  readonly limit?: number
  readonly offset?: number
}

// From codersdk/parameters.go
export interface Parameter {
  readonly id: string
  readonly scope: ParameterScope
  readonly scope_id: string
  readonly name: string
  readonly source_scheme: ParameterSourceScheme
  readonly destination_scheme: ParameterDestinationScheme
  readonly created_at: string
  readonly updated_at: string
}

// From codersdk/parameters.go
export interface ParameterSchema {
  readonly id: string
  readonly created_at: string
  readonly job_id: string
  readonly name: string
  readonly description: string
  readonly default_source_scheme: ParameterSourceScheme
  readonly default_source_value: string
  readonly allow_override_source: boolean
  readonly default_destination_scheme: ParameterDestinationScheme
  readonly allow_override_destination: boolean
  readonly default_refresh: string
  readonly redisplay_value: boolean
  readonly validation_error: string
  readonly validation_condition: string
  readonly validation_type_system: string
  readonly validation_value_type: string
  readonly validation_contains?: string[]
}

// From codersdk/groups.go
export interface PatchGroupRequest {
  readonly add_users: string[]
  readonly remove_users: string[]
  readonly name: string
  readonly avatar_url?: string
  readonly quota_allowance?: number
}

// From codersdk/deployment.go
export interface PprofConfig {
  readonly enable: DeploymentConfigField<boolean>
  readonly address: DeploymentConfigField<string>
}

// From codersdk/deployment.go
export interface PrometheusConfig {
  readonly enable: DeploymentConfigField<boolean>
  readonly address: DeploymentConfigField<string>
}

// From codersdk/deployment.go
export interface ProvisionerConfig {
  readonly daemons: DeploymentConfigField<number>
  readonly daemon_poll_interval: DeploymentConfigField<number>
  readonly daemon_poll_jitter: DeploymentConfigField<number>
  readonly force_cancel_interval: DeploymentConfigField<number>
}

// From codersdk/provisionerdaemons.go
export interface ProvisionerDaemon {
  readonly id: string
  readonly created_at: string
  readonly updated_at?: string
  readonly name: string
  readonly provisioners: ProvisionerType[]
  readonly tags: Record<string, string>
}

// From codersdk/provisionerdaemons.go
export interface ProvisionerJob {
  readonly id: string
  readonly created_at: string
  readonly started_at?: string
  readonly completed_at?: string
  readonly canceled_at?: string
  readonly error?: string
  readonly status: ProvisionerJobStatus
  readonly worker_id?: string
  readonly file_id: string
  readonly tags: Record<string, string>
}

// From codersdk/provisionerdaemons.go
export interface ProvisionerJobLog {
  readonly id: number
  readonly created_at: string
  readonly log_source: LogSource
  readonly log_level: LogLevel
  readonly stage: string
  readonly output: string
}

// From codersdk/workspaces.go
export interface PutExtendWorkspaceRequest {
  readonly deadline: string
}

// From codersdk/deployment.go
export interface RateLimitConfig {
  readonly disable_all: DeploymentConfigField<boolean>
  readonly api: DeploymentConfigField<number>
}

// From codersdk/replicas.go
export interface Replica {
  readonly id: string
  readonly hostname: string
  readonly created_at: string
  readonly relay_address: string
  readonly region_id: number
  readonly error: string
  readonly database_latency: number
}

// From codersdk/client.go
export interface Response {
  readonly message: string
  readonly detail?: string
  readonly validations?: ValidationError[]
}

// From codersdk/roles.go
export interface Role {
  readonly name: string
  readonly display_name: string
}

// From codersdk/serversentevents.go
export interface ServerSentEvent {
  readonly type: ServerSentEventType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO explain why this is needed
  readonly data: any
}

// From codersdk/deployment.go
export interface ServiceBannerConfig {
  readonly enabled: boolean
  readonly message?: string
  readonly background_color?: string
}

// From codersdk/deployment.go
export interface SupportConfig {
  readonly links: DeploymentConfigField<LinkConfig[]>
}

// From codersdk/deployment.go
export interface SwaggerConfig {
  readonly enable: DeploymentConfigField<boolean>
}

// From codersdk/deployment.go
export interface TLSConfig {
  readonly enable: DeploymentConfigField<boolean>
  readonly address: DeploymentConfigField<string>
  readonly redirect_http: DeploymentConfigField<boolean>
  readonly cert_file: DeploymentConfigField<string[]>
  readonly client_auth: DeploymentConfigField<string>
  readonly client_ca_file: DeploymentConfigField<string>
  readonly key_file: DeploymentConfigField<string[]>
  readonly min_version: DeploymentConfigField<string>
  readonly client_cert_file: DeploymentConfigField<string>
  readonly client_key_file: DeploymentConfigField<string>
}

// From codersdk/deployment.go
export interface TelemetryConfig {
  readonly enable: DeploymentConfigField<boolean>
  readonly trace: DeploymentConfigField<boolean>
  readonly url: DeploymentConfigField<string>
}

// From codersdk/templates.go
export interface Template {
  readonly id: string
  readonly created_at: string
  readonly updated_at: string
  readonly organization_id: string
  readonly name: string
  readonly display_name: string
  readonly provisioner: ProvisionerType
  readonly active_version_id: string
  readonly active_user_count: number
  readonly build_time_stats: TemplateBuildTimeStats
  readonly description: string
  readonly icon: string
  readonly default_ttl_ms: number
  readonly created_by_id: string
  readonly created_by_name: string
  readonly allow_user_cancel_workspace_jobs: boolean
}

// From codersdk/templates.go
export interface TemplateACL {
  readonly users: TemplateUser[]
  readonly group: TemplateGroup[]
}

// From codersdk/templates.go
export type TemplateBuildTimeStats = Record<
  WorkspaceTransition,
  TransitionStats
>

// From codersdk/templates.go
export interface TemplateDAUsResponse {
  readonly entries: DAUEntry[]
}

// From codersdk/templates.go
export interface TemplateExample {
  readonly id: string
  readonly url: string
  readonly name: string
  readonly description: string
  readonly icon: string
  readonly tags: string[]
  readonly markdown: string
}

// From codersdk/templates.go
export interface TemplateGroup extends Group {
  readonly role: TemplateRole
}

// From codersdk/templates.go
export interface TemplateUser extends User {
  readonly role: TemplateRole
}

// From codersdk/templateversions.go
export interface TemplateVersion {
  readonly id: string
  readonly template_id?: string
  readonly organization_id?: string
  readonly created_at: string
  readonly updated_at: string
  readonly name: string
  readonly job: ProvisionerJob
  readonly readme: string
  readonly created_by: User
}

// From codersdk/templateversions.go
export interface TemplateVersionGitAuth {
  readonly id: string
  readonly type: GitProvider
  readonly authenticate_url: string
  readonly authenticated: boolean
}

// From codersdk/templateversions.go
export interface TemplateVersionParameter {
  readonly name: string
  readonly description: string
  readonly description_plaintext: string
  readonly type: string
  readonly mutable: boolean
  readonly default_value: string
  readonly icon: string
  readonly options: TemplateVersionParameterOption[]
  readonly validation_error?: string
  readonly validation_regex?: string
  readonly validation_min?: number
  readonly validation_max?: number
  readonly validation_monotonic?: ValidationMonotonicOrder
}

// From codersdk/templateversions.go
export interface TemplateVersionParameterOption {
  readonly name: string
  readonly description: string
  readonly value: string
  readonly icon: string
}

// From codersdk/templateversions.go
export interface TemplateVersionVariable {
  readonly name: string
  readonly description: string
  readonly type: string
  readonly value: string
  readonly default_value: string
  readonly required: boolean
  readonly sensitive: boolean
}

// From codersdk/templates.go
export interface TemplateVersionsByTemplateRequest extends Pagination {
  readonly template_id: string
}

// From codersdk/apikey.go
export interface TokensFilter {
  readonly include_all: boolean
}

// From codersdk/deployment.go
export interface TraceConfig {
  readonly enable: DeploymentConfigField<boolean>
  readonly honeycomb_api_key: DeploymentConfigField<string>
  readonly capture_logs: DeploymentConfigField<boolean>
}

// From codersdk/templates.go
export interface TransitionStats {
  readonly P50?: number
  readonly P95?: number
}

// From codersdk/templates.go
export interface UpdateActiveTemplateVersion {
  readonly id: string
}

// From codersdk/deployment.go
export interface UpdateAppearanceConfig {
  readonly logo_url: string
  readonly service_banner: ServiceBannerConfig
}

// From codersdk/updatecheck.go
export interface UpdateCheckResponse {
  readonly current: boolean
  readonly version: string
  readonly url: string
}

// From codersdk/users.go
export interface UpdateRoles {
  readonly roles: string[]
}

// From codersdk/templates.go
export interface UpdateTemplateACL {
  readonly user_perms?: Record<string, TemplateRole>
  readonly group_perms?: Record<string, TemplateRole>
}

// From codersdk/templates.go
export interface UpdateTemplateMeta {
  readonly name?: string
  readonly display_name?: string
  readonly description?: string
  readonly icon?: string
  readonly default_ttl_ms?: number
  readonly allow_user_cancel_workspace_jobs?: boolean
}

// From codersdk/users.go
export interface UpdateUserPasswordRequest {
  readonly old_password: string
  readonly password: string
}

// From codersdk/users.go
export interface UpdateUserProfileRequest {
  readonly username: string
}

// From codersdk/workspaces.go
export interface UpdateWorkspaceAutostartRequest {
  readonly schedule?: string
}

// From codersdk/workspaces.go
export interface UpdateWorkspaceRequest {
  readonly name?: string
}

// From codersdk/workspaces.go
export interface UpdateWorkspaceTTLRequest {
  readonly ttl_ms?: number
}

// From codersdk/files.go
export interface UploadResponse {
  readonly hash: string
}

// From codersdk/users.go
export interface User {
  readonly id: string
  readonly username: string
  readonly email: string
  readonly created_at: string
  readonly last_seen_at: string
  readonly status: UserStatus
  readonly organization_ids: string[]
  readonly roles: Role[]
  readonly avatar_url: string
}

// From codersdk/users.go
export interface UserRoles {
  readonly roles: string[]
  readonly organization_roles: Record<string, string[]>
}

// From codersdk/users.go
export interface UsersRequest extends Pagination {
  readonly q?: string
}

// From codersdk/client.go
export interface ValidationError {
  readonly field: string
  readonly detail: string
}

// From codersdk/organizations.go
export interface VariableValue {
  readonly name: string
  readonly value: string
}

// From codersdk/workspaces.go
export interface Workspace {
  readonly id: string
  readonly created_at: string
  readonly updated_at: string
  readonly owner_id: string
  readonly owner_name: string
  readonly template_id: string
  readonly template_name: string
  readonly template_display_name: string
  readonly template_icon: string
  readonly template_allow_user_cancel_workspace_jobs: boolean
  readonly latest_build: WorkspaceBuild
  readonly outdated: boolean
  readonly name: string
  readonly autostart_schedule?: string
  readonly ttl_ms?: number
  readonly last_used_at: string
}

// From codersdk/workspaceagents.go
export interface WorkspaceAgent {
  readonly id: string
  readonly created_at: string
  readonly updated_at: string
  readonly first_connected_at?: string
  readonly last_connected_at?: string
  readonly disconnected_at?: string
  readonly status: WorkspaceAgentStatus
  readonly lifecycle_state: WorkspaceAgentLifecycle
  readonly name: string
  readonly resource_id: string
  readonly instance_id?: string
  readonly architecture: string
  readonly environment_variables: Record<string, string>
  readonly operating_system: string
  readonly startup_script?: string
  readonly directory?: string
  readonly expanded_directory?: string
  readonly version: string
  readonly apps: WorkspaceApp[]
  readonly latency?: Record<string, DERPRegion>
  readonly connection_timeout_seconds: number
  readonly troubleshooting_url: string
  readonly login_before_ready: boolean
  readonly startup_script_timeout_seconds: number
}

// From codersdk/workspaceagentconn.go
export interface WorkspaceAgentListeningPort {
  readonly process_name: string
  readonly network: string
  readonly port: number
}

// From codersdk/workspaceagentconn.go
export interface WorkspaceAgentListeningPortsResponse {
  readonly ports: WorkspaceAgentListeningPort[]
}

// From codersdk/workspaceapps.go
export interface WorkspaceApp {
  readonly id: string
  readonly url: string
  readonly external: boolean
  readonly slug: string
  readonly display_name: string
  readonly command?: string
  readonly icon?: string
  readonly subdomain: boolean
  readonly sharing_level: WorkspaceAppSharingLevel
  readonly healthcheck: Healthcheck
  readonly health: WorkspaceAppHealth
}

// From codersdk/workspacebuilds.go
export interface WorkspaceBuild {
  readonly id: string
  readonly created_at: string
  readonly updated_at: string
  readonly workspace_id: string
  readonly workspace_name: string
  readonly workspace_owner_id: string
  readonly workspace_owner_name: string
  readonly template_version_id: string
  readonly template_version_name: string
  readonly build_number: number
  readonly transition: WorkspaceTransition
  readonly initiator_id: string
  readonly initiator_name: string
  readonly job: ProvisionerJob
  readonly reason: BuildReason
  readonly resources: WorkspaceResource[]
  readonly deadline?: string
  readonly status: WorkspaceStatus
  readonly daily_cost: number
}

// From codersdk/workspacebuilds.go
export interface WorkspaceBuildParameter {
  readonly name: string
  readonly value: string
}

// From codersdk/workspaces.go
export interface WorkspaceBuildsRequest extends Pagination {
  readonly WorkspaceID: string
  readonly Since: string
}

// From codersdk/workspaces.go
export interface WorkspaceFilter {
  readonly q?: string
}

// From codersdk/workspaces.go
export interface WorkspaceOptions {
  readonly include_deleted?: boolean
}

// From codersdk/workspaces.go
export interface WorkspaceQuota {
  readonly credits_consumed: number
  readonly budget: number
}

// From codersdk/workspacebuilds.go
export interface WorkspaceResource {
  readonly id: string
  readonly created_at: string
  readonly job_id: string
  readonly workspace_transition: WorkspaceTransition
  readonly type: string
  readonly name: string
  readonly hide: boolean
  readonly icon: string
  readonly agents?: WorkspaceAgent[]
  readonly metadata?: WorkspaceResourceMetadata[]
  readonly daily_cost: number
}

// From codersdk/workspacebuilds.go
export interface WorkspaceResourceMetadata {
  readonly key: string
  readonly value: string
  readonly sensitive: boolean
}

// From codersdk/workspaces.go
export interface WorkspacesRequest extends Pagination {
  readonly q?: string
}

// From codersdk/workspaces.go
export interface WorkspacesResponse {
  readonly workspaces: Workspace[]
  readonly count: number
}

// From codersdk/apikey.go
export type APIKeyScope = "all" | "application_connect"
export const APIKeyScopes: APIKeyScope[] = ["all", "application_connect"]

// From codersdk/audit.go
export type AuditAction =
  | "create"
  | "delete"
  | "login"
  | "logout"
  | "start"
  | "stop"
  | "write"
export const AuditActions: AuditAction[] = [
  "create",
  "delete",
  "login",
  "logout",
  "start",
  "stop",
  "write",
]

// From codersdk/workspacebuilds.go
export type BuildReason = "autostart" | "autostop" | "initiator"
export const BuildReasons: BuildReason[] = [
  "autostart",
  "autostop",
  "initiator",
]

// From codersdk/deployment.go
export type Entitlement = "entitled" | "grace_period" | "not_entitled"
export const Entitlements: Entitlement[] = [
  "entitled",
  "grace_period",
  "not_entitled",
]

// From codersdk/deployment.go
export type Experiment = "authz_querier" | "template_editor"
export const Experiments: Experiment[] = ["authz_querier", "template_editor"]

// From codersdk/deployment.go
export type FeatureName =
  | "appearance"
  | "audit_log"
  | "browser_only"
  | "external_provisioner_daemons"
  | "high_availability"
  | "multiple_git_auth"
  | "scim"
  | "template_rbac"
  | "user_limit"
export const FeatureNames: FeatureName[] = [
  "appearance",
  "audit_log",
  "browser_only",
  "external_provisioner_daemons",
  "high_availability",
  "multiple_git_auth",
  "scim",
  "template_rbac",
  "user_limit",
]

// From codersdk/workspaceagents.go
export type GitProvider = "azure-devops" | "bitbucket" | "github" | "gitlab"
export const GitProviders: GitProvider[] = [
  "azure-devops",
  "bitbucket",
  "github",
  "gitlab",
]

// From codersdk/provisionerdaemons.go
export type LogLevel = "debug" | "error" | "info" | "trace" | "warn"
export const LogLevels: LogLevel[] = ["debug", "error", "info", "trace", "warn"]

// From codersdk/provisionerdaemons.go
export type LogSource = "provisioner" | "provisioner_daemon"
export const LogSources: LogSource[] = ["provisioner", "provisioner_daemon"]

// From codersdk/apikey.go
export type LoginType = "github" | "oidc" | "password" | "token"
export const LoginTypes: LoginType[] = ["github", "oidc", "password", "token"]

// From codersdk/parameters.go
export type ParameterDestinationScheme =
  | "environment_variable"
  | "none"
  | "provisioner_variable"
export const ParameterDestinationSchemes: ParameterDestinationScheme[] = [
  "environment_variable",
  "none",
  "provisioner_variable",
]

// From codersdk/parameters.go
export type ParameterScope = "import_job" | "template" | "workspace"
export const ParameterScopes: ParameterScope[] = [
  "import_job",
  "template",
  "workspace",
]

// From codersdk/parameters.go
export type ParameterSourceScheme = "data" | "none"
export const ParameterSourceSchemes: ParameterSourceScheme[] = ["data", "none"]

// From codersdk/parameters.go
export type ParameterTypeSystem = "hcl" | "none"
export const ParameterTypeSystems: ParameterTypeSystem[] = ["hcl", "none"]

// From codersdk/provisionerdaemons.go
export type ProvisionerJobStatus =
  | "canceled"
  | "canceling"
  | "failed"
  | "pending"
  | "running"
  | "succeeded"
export const ProvisionerJobStatuses: ProvisionerJobStatus[] = [
  "canceled",
  "canceling",
  "failed",
  "pending",
  "running",
  "succeeded",
]

// From codersdk/organizations.go
export type ProvisionerStorageMethod = "file"
export const ProvisionerStorageMethods: ProvisionerStorageMethod[] = ["file"]

// From codersdk/organizations.go
export type ProvisionerType = "echo" | "terraform"
export const ProvisionerTypes: ProvisionerType[] = ["echo", "terraform"]

// From codersdk/audit.go
export type ResourceType =
  | "api_key"
  | "git_ssh_key"
  | "group"
  | "license"
  | "template"
  | "template_version"
  | "user"
  | "workspace"
  | "workspace_build"
export const ResourceTypes: ResourceType[] = [
  "api_key",
  "git_ssh_key",
  "group",
  "license",
  "template",
  "template_version",
  "user",
  "workspace",
  "workspace_build",
]

// From codersdk/serversentevents.go
export type ServerSentEventType = "data" | "error" | "ping"
export const ServerSentEventTypes: ServerSentEventType[] = [
  "data",
  "error",
  "ping",
]

// From codersdk/templates.go
export type TemplateRole = "" | "admin" | "use"
export const TemplateRoles: TemplateRole[] = ["", "admin", "use"]

// From codersdk/users.go
export type UserStatus = "active" | "suspended"
export const UserStatuses: UserStatus[] = ["active", "suspended"]

// From codersdk/templateversions.go
export type ValidationMonotonicOrder = "decreasing" | "increasing"
export const ValidationMonotonicOrders: ValidationMonotonicOrder[] = [
  "decreasing",
  "increasing",
]

// From codersdk/workspaceagents.go
export type WorkspaceAgentLifecycle =
  | "created"
  | "ready"
  | "start_error"
  | "start_timeout"
  | "starting"
export const WorkspaceAgentLifecycles: WorkspaceAgentLifecycle[] = [
  "created",
  "ready",
  "start_error",
  "start_timeout",
  "starting",
]

// From codersdk/workspaceagents.go
export type WorkspaceAgentStatus =
  | "connected"
  | "connecting"
  | "disconnected"
  | "timeout"
export const WorkspaceAgentStatuses: WorkspaceAgentStatus[] = [
  "connected",
  "connecting",
  "disconnected",
  "timeout",
]

// From codersdk/workspaceapps.go
export type WorkspaceAppHealth =
  | "disabled"
  | "healthy"
  | "initializing"
  | "unhealthy"
export const WorkspaceAppHealths: WorkspaceAppHealth[] = [
  "disabled",
  "healthy",
  "initializing",
  "unhealthy",
]

// From codersdk/workspaceapps.go
export type WorkspaceAppSharingLevel = "authenticated" | "owner" | "public"
export const WorkspaceAppSharingLevels: WorkspaceAppSharingLevel[] = [
  "authenticated",
  "owner",
  "public",
]

// From codersdk/workspacebuilds.go
export type WorkspaceStatus =
  | "canceled"
  | "canceling"
  | "deleted"
  | "deleting"
  | "failed"
  | "pending"
  | "running"
  | "starting"
  | "stopped"
  | "stopping"
export const WorkspaceStatuses: WorkspaceStatus[] = [
  "canceled",
  "canceling",
  "deleted",
  "deleting",
  "failed",
  "pending",
  "running",
  "starting",
  "stopped",
  "stopping",
]

// From codersdk/workspacebuilds.go
export type WorkspaceTransition = "delete" | "start" | "stop"
export const WorkspaceTransitions: WorkspaceTransition[] = [
  "delete",
  "start",
  "stop",
]

// From codersdk/deployment.go
export type Flaggable =
  | string
  | number
  | boolean
  | string[]
  | GitAuthConfig[]
  | LinkConfig[]
