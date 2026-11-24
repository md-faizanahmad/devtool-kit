import { format } from 'sql-formatter';
import type { SqlFormatterConfig } from '../sql-formatter.types';

export const formatSql = (sql: string, config: SqlFormatterConfig): string => {
  if (!sql.trim()) {
    return '';
  }

  return format(sql, {
    language: config.dialect,
    keywordCase: config.keywordCase,
    tabWidth: config.indentation === 'tab' ? 1 : config.indentation,
    useTabs: config.indentation === 'tab',
  });
};

export const minifySql = (sql: string): string => {
  if (!sql.trim()) {
    return '';
  }

  return sql
    .replace(/--[^\r\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([(),;=<>])\s*/g, '$1')
    .trim();
};
