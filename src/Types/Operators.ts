/**
 * @description Equal operator
 * @example where(["name", "=", "Donald"])
 */
export type MatchEqual = "=";

/**
 * @description Equal operator
 * @example where(["name", "=", "Donald"])
 */
export type MatchEqual2 = "===";

/**
 * @description Equal operator
 * @example where(["name", "==", "Donald"])
 */
export type UnsafeMatchEqual = "==";

/**
 * @description Not equal operator
 * @example where(["name", "!=", "Donald"])
 */
export type MatchNotEqual = "!=";

/**
 * @description Not equal operator
 * @example where(["name", "!=", "Donald"])
 */
export type MatchNotEqual2 = "!==";

/**
 * @description Not equal operator
 * @example where(["name", "<>", "Donald"])
 */
export type UnsafeMatchNotEqual = "<>";

/**
 * @description Greater than operator
 * @example where(["age", ">", 18])
 */
export type MatchGreaterThan = ">";

/**
 * @description Greater than or equal operator
 * @example where(["age", ">=", 18])
 */
export type MatchGreaterThanOrEqual = ">=";

/**
 * @description Less than operator
 * @example where(["age", "<", 18])
 */
export type MatchLessThan = "<";

/**
 * @description Less than or equal operator
 * @example where(["age", "<=", 18])
 */
export type MatchLessThanOrEqual = "<=";

/**
 * @description Like operator
 * @example where(["name", "like", "Don%"])
 */
export type MatchLike = "LIKE" | "like";

/**
 * @description Not like operator
 * @example where(["name", "not like", "Don%"])
 */
export type MatchNotLike = "NOT LIKE" | "not like";

/**
 * @description In operator
 * @example where(["name", "in", ["Donald", "Daisy"]])
 */
export type MatchIn = "IN" | "in";

/**
 * @description Not in operator
 * @example where(["name", "not in", ["Donald", "Daisy"]])
 */
export type MatchNotIn = "NOT IN" | "not in";

/**
 * @description Contains operator
 * @example where(["name", "contains", "ald"])
 */
export type MatchContains = "CONTAINS" | "contains";

/**
 * @description Not contains operator
 * @example where(["name", "not contains", "ald"])
 */
export type MatchNotContains = "NOT CONTAINS" | "not contains";

/**
 * @description Between operator
 * @example where(["age", "between", [18, 30]])
 */
export type MatchBetween = "BETWEEN" | "between";

/**
 * @description Not between operator
 * @example where(["age", "not between", [18, 30]])
 */
export type MatchNotBetween = "NOT BETWEEN" | "not between";

/**
 * @description Exists operator
 * @example where(["age", "exists", true])
 */
export type MatchExists = "EXISTS" | "exists";

/**
 * @description Operator types
 */
export type OperatorTypes = {
    '=': any;
    '===': any;
    '==': any;
    '!=': any;
    '!==': any;
    '<>': any;
    '>': number;
    '>=': number;
    '<': number;
    '<=': number;
    'LIKE': string;
    'like': string;
    'NOT LIKE': string;
    'not like': string;
    'IN': any[];
    'in': any[];
    'NOT IN': any[];
    'not in ': any[];
    'CONTAINS': string;
    'contains': string;
    'NOT CONTAINS': string;
    'not contains': string;
    'BETWEEN': number[];
    'between': number[];
    'NOT BETWEEN': number[];
    'not between': number[];
    'EXISTS': boolean;
    'exists': boolean;
};

/**
 * @description Operator type
 * @example where(["name", "=", "Donald"])
 */
export type Operator<T = unknown> = MatchEqual | MatchEqual2 | UnsafeMatchEqual | MatchNotEqual | MatchNotEqual2 | UnsafeMatchNotEqual | MatchGreaterThan | MatchGreaterThanOrEqual | MatchLessThan | MatchLessThanOrEqual | MatchLike | MatchNotLike | MatchIn | MatchNotIn | MatchContains | MatchNotContains | MatchBetween | MatchNotBetween | MatchExists;
