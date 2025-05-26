import { TokenInfo } from "../../../types/types";

export type InputMode = 'usd' | 'token';

interface RoleState {
  token: TokenInfo | null;
  inputValue: string;
  subtext: string;
  inputMode: InputMode;
}

export interface SwapState {
  source: RoleState;
  target: RoleState;
}