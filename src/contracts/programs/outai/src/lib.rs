use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod outai {
    use super::*;

    pub fn initialize_content(
        ctx: Context<InitializeContent>,
        content_hash: [u8; 32],
        creator: Pubkey,
        usage_rights: ContentRights,
    ) -> Result<()> {
        let content = &mut ctx.accounts.content;
        content.creator = creator;
        content.content_hash = content_hash;
        content.usage_rights = usage_rights;
        content.created_at = Clock::get()?.unix_timestamp;
        Ok(())
    }

    pub fn update_usage_rights(
        ctx: Context<UpdateUsageRights>,
        new_rights: ContentRights,
    ) -> Result<()> {
        let content = &mut ctx.accounts.content;
        require!(
            content.creator == ctx.accounts.creator.key(),
            OutaiError::Unauthorized
        );
        content.usage_rights = new_rights;
        Ok(())
    }

    pub fn create_license(
        ctx: Context<CreateLicense>,
        terms: LicenseTerms,
    ) -> Result<()> {
        let license = &mut ctx.accounts.license;
        license.content = ctx.accounts.content.key();
        license.licensee = ctx.accounts.licensee.key();
        license.terms = terms;
        license.created_at = Clock::get()?.unix_timestamp;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeContent<'info> {
    #[account(
        init,
        payer = creator,
        space = 8 + Content::LEN
    )]
    pub content: Account<'info, Content>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct UpdateUsageRights<'info> {
    #[account(mut)]
    pub content: Account<'info, Content>,
    pub creator: Signer<'info>,
}

#[derive(Accounts)]
pub struct CreateLicense<'info> {
    #[account(
        init,
        payer = licensee,
        space = 8 + License::LEN
    )]
    pub license: Account<'info, License>,
    pub content: Account<'info, Content>,
    #[account(mut)]
    pub licensee: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[account]
pub struct Content {
    pub creator: Pubkey,
    pub content_hash: [u8; 32],
    pub usage_rights: ContentRights,
    pub created_at: i64,
}

#[account]
pub struct License {
    pub content: Pubkey,
    pub licensee: Pubkey,
    pub terms: LicenseTerms,
    pub created_at: i64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ContentRights {
    pub ai_training_allowed: bool,
    pub commercial_use_allowed: bool,
    pub attribution_required: bool,
    pub royalty_percentage: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct LicenseTerms {
    pub duration: i64,
    pub usage_type: UsageType,
    pub payment_amount: u64,
    pub payment_token: Pubkey,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub enum UsageType {
    AI_Training,
    Commercial,
    NonCommercial,
}

#[error_code]
pub enum OutaiError {
    #[msg("Unauthorized operation")]
    Unauthorized,
    #[msg("Invalid content rights")]
    InvalidRights,
    #[msg("License already exists")]
    LicenseExists,
} 