pragma solidity >=0.4.21 <0.6.0;

import './StandardToken.sol';

/**
 * @title SimpleToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `StandardToken` functions.
 */
contract SimpleToken is StandardToken {
  using SafeMath for uint256;

  string public constant name = "SimpleToken"; // solium-disable-line uppercase
  string public constant symbol = "SIM"; // solium-disable-line uppercase
  uint8 public constant decimals = 18; // solium-disable-line uppercase

  uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals));

  constructor() public {
    _totalSupply = INITIAL_SUPPLY;
    _balances[msg.sender] = INITIAL_SUPPLY;
    transfer(msg.sender, INITIAL_SUPPLY);
  }
}
