/**
 * The Send workspace's pre-link state ("Send these" from Generate
 * results, ticket 06): the generate job the workspace opens pre-linked
 * to, with that job's generated recipients pre-selected. The workspace
 * still lets the user adjust the selection, source, message, and SMTP
 * freely - the pre-link only seeds the starting point.
 */
export interface SendPrefill {
  readonly generateJobId: string;
}
