# Notional x Index Coop FIXED ETF

This is a combined audit with code contributed by both Notional Finance and Index Coop.

Notional Wrapped fCash is a compatibility layer for ERC20 tokens and fCash. See details in `notional-wrapped-fcash/README.md`. A link to the repo is here: https://github.com/notional-finance/wrapped-fcash

---

# Contest setup

## ⭐️ Sponsor: Provide contest details

Under "SPONSORS ADD INFO HERE" heading below, include the following:

- [ ] Name of each contract and:
  - [ ] source lines of code (excluding blank lines and comments) in each
  - [ ] external contracts called in each
  - [ ] libraries used in each
- [ ] Describe any novel or unique curve logic or mathematical models implemented in the contracts
- [ ] Does the token conform to the ERC-20 standard? In what specific ways does it differ?
- [ ] Describe anything else that adds any special logic that makes your approach unique
- [ ] Identify any areas of specific concern in reviewing the code
- [ ] Add all of the code to this repo that you want reviewed
- [ ] Create a PR to this repo with the above changes.

---

# Contest prep

## ⭐️ Sponsor: Contest prep

- [ ] Make sure your code is thoroughly commented using the [NatSpec format](https://docs.soliditylang.org/en/v0.5.10/natspec-format.html#natspec-format).
- [ ] Modify the bottom of this `README.md` file to describe how your code is supposed to work with links to any relevent documentation and any other criteria/details that thke C4 Wardens should keep in mind when reviewing. ([Here's a well-constructed example.](https://github.com/code-423n4/2021-06-gro/blob/main/README.md))
- [ ] Please have final versions of contracts and documentation added/updated in this repo **no less than 8 hours prior to contest start time.**
- [ ] Ensure that you have access to the _findings_ repo where issues will be submitted.
- [ ] Promote the contest on Twitter (optional: tag in relevant protocols, etc.)
- [ ] Share it with your own communities (blog, Discord, Telegram, email newsletters, etc.)
- [ ] Optional: pre-record a high-level overview of your protocol (not just specific smart contract functions). This saves wardens a lot of time wading through documentation.
- [ ] Delete this checklist and all text above the line below when you're ready.

## O

# Notional x Index Coop contest details

- $71,250 USDC main award pot
- $3,750 USDC gas optimization pot
- Join [C4 Discord](https://discord.gg/code4rena) to register
- Submit findings [using the C4 form](https://code4rena.com/contests/2022-05-notional-fcash-index-coop-contest/submit)
- [Read our guidelines for more details](https://docs.code4rena.com/roles/wardens)
- Starts June 6, 2022 20:00 UTC
- Ends June 13, 2022 19:59 UTC

This repo will be made public before the start of the contest. (C4 delete this line when made public)

# Background

## Notional
[Notional](https://notional.finance/) is a protocol on Ethereum that facilitates fixed-rate, fixed-term crypto asset lending and borrowing through a novel financial instrument called fCash.

## Set Protocol
[Set Protocol](https://www.setprotocol.com/) is a non-custodial protocol built on Ethereum that allows for the creation, management, and trading of Sets, ERC20 tokens that represent a portfolio or basket of underlying assets.

## Index Coop
[Index Coop](https://indexcoop.com/) is a DAO that leverages Set Protocol's technology to build products that make crypto investing simple for everyone.

## Purpose of integration
The goal of this integration is to support Notionals fCash tokens as underlying positions of a SetToken in order to allow the creation of products that combine multiple fixed-rate lending positions across maturities and underlying currencies.

## Key components
Since fCash tokens themselves are not ERC20 compatible this integration consists of two key components:
1. `WrappedfCash`: An ERC20 compliant wrapper for `fCash` developed by the notional team. (see [here](notional-wrapped-fcash))
2. `NotionalTradeModule`: A new Module developed by IndexCoop to be added to the SetProtocol architecture in order to manage (wrapped) fCash positions on a SetToken. (see [here](index-coop-notional-trade-module))

## NotionalTradeModule
The Notional trade module has two main functions:
1. Allow the Manager of a Set Token to trade in and out of fCash positions on behalf of the Set
2. Automatically redeem matured fCash position for either the asset or underlying token

## Resources
- [Set Protocol Repo (reduced version also in this repo)](https://github.com/SetProtocol/set-protocol-v2)
- [Set Protocol Docs (section on modules)](https://docs.tokensets.com/developers/guides-and-tutorials/protocol/add-module)
- [Set Architecture Overview](https://www.youtube.com/watch?v=hFmGOOdT8G8)
- [NotionalTradeModule walkhtrough](https://www.youtube.com/watch?v=Cp32ai4A5oI)
- [WrappedFCash walkthrough](https://www.youtube.com/watch?v=RvCYFR2Yjls)
- [WrappedFCash repo (content also subdirectory in this repo)](https://github.com/notional-finance/wrapped-fcash)
- [Notional User Docs](https://docs.notional.finance/notional-v2/)
- [Notional Developer Docs](https://docs.notional.finance/developer-documentation/)

# Contest scope

In general the scope of this contest covers the two contracts [WrappedfCash](notional-wrapped-fcash/contracts/wfCashLogic.sol) and [NotionalTradeModule](index-coop-notional-trade-module/contracts/protocol/modules/v1/NotionalTradeModule.sol) as well as their interaction with the rest of the notional and set-protocol architecture. 

| Contract Name | Source Lines of Code | Libraries | External Calls |
| ------------- | -------------------- | ---------- | -------------- |
| [NotionalTradeModule](index-coop-notional-trade-module/contracts/protocol/modules/v1/NotionalTradeModule.sol) | ~396 sLoC | [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)| [WrappedfCash](notional-wrapped-fcash/contracts/wfCashLogic.sol), [WrappedfCashFactory](notional-wrapped-fcash/contracts/proxy/WrappedfCashFactory.sol), [SetToken](index-coop-notional-trade-module/contracts/protocol/SetToken.sol), [DebtIssuanceModule](index-coop-notional-trade-module/contracts/protocol/modules/v1/DebtIssuanceModule.sol)

TODO: Add Table entry for WrappedfCash

## WrappedfCash
TODO: Add assumptions / invariants / known limitations for wrappedfCash

## Notional Trade Module / Set Protocol

## In Scope
At a high level, the core invariants that we expect to be upheld are that:

- The manager of a Set can mint any fCash-position (identified by `currencyId` and `maturity`) on behalf of the Set using either the asset or underlying token given that:
    - Specified `currencyId` and `maturity` correspond to a valid and active (i.e. not matured) fCash token on the notional protocol
    - The set token contains either the asset / or underlying token as a component in sufficient quantity.
    - The `NotionalTradeModule` has been added / registered in the correct way.
- The manager of a Set can redeem any fCash-position  for either the asset or underlying token given that:
    - Specified `currencyId` and `maturity` correspond to a valid fCash token that has previously been added as a component to this set.
    - The `NotionalTradeModule` has been added / registered in the correct way.
- For both the mint and redeem case the following should be true:
    - The relative position of all tokens involved should be adjusted correctly. If a tokens position is 0 afterwards it should be removed from the list of components.
    - The received / spent amounts should not violate the min / max limits specified.
- When an fCash position matures. Any of the following actions should lead to an automatic redemption of the whole amount of this fCash position:
    - A user issues any amount of set tokens
    - A user redeems any amount of set tokens
    - Anyone calls the `redeemMaturedPositions` method
    - The `NotionalTradeModule` is removed from the set token
- The automatic redemption should fulfil the same assumptions as a manually triggered one.
- In general, no user including the set's manager should be able to:
    - Drain any underlying tokens from either the set token or the fCash wrapper.
    - Issue set tokens for less than the required amount of underlying tokens.
    - Redeem set tokens for more than the respective amount of underlying tokens
    - Produce a contract state that breaks the issuance / redemption process or any of the functionality outlined above

## Out of Scope

There are a number of known limitations that are explicitly out of scope for the context of the competition:

- The `Owner` (not to be confused with the manager) of the Set token can add arbitrary logic as a new a set token module. This actor should be assumed to act in the protocols / users best interest and not collude in any attack or be otherwise compromised.
- Funds (both ERC20 and ETH) that are transfered to any of the involved contracts outside of a supported function call, might be locked / lost indefinetely.


