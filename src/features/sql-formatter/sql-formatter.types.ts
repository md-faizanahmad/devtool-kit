export type SqlDialect =
  | 'sql'
  | 'mysql'
  | 'postgresql'
  | 'sqlite'
  | 'transactsql'
  | 'plsql'
  | 'mariadb'
  | 'db2'
  | 'n1ql'
  | 'redshift'
  | 'spark'
  | 'tsql'
  | 'trino';

export type SqlKeywordCase = 'upper' | 'lower' | 'preserve';

export type SqlIndentation = 2 | 4 | 'tab';

export interface SqlFormatterConfig {
  dialect: SqlDialect;
  keywordCase: SqlKeywordCase;
  indentation: SqlIndentation;
}

export interface SqlFormatterState {
  input: string;
  output: string;
  config: SqlFormatterConfig;
  error: string | null;
}
