import { Events } from 'discord.js';
import { createErrorEmbed } from '../utils/embeds.js';

export const name = Events.InteractionCreate;

export async function execute(interaction) {
    // Handle slash commands
    if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}:`, error);
            
            const errorEmbed = createErrorEmbed(
                'Something went wrong!',
                'There was an error executing this command. Please try again later.'
            );

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }
        }
    }
    
    // Handle button interactions
    else if (interaction.isButton()) {
        // Handle team join buttons
        if (interaction.customId.startsWith('join_team_')) {
            const teamId = interaction.customId.replace('join_team_', '');
            // TODO: Implement team join logic
            await interaction.reply({ 
                content: `Request to join team sent! The team leader will be notified.`,
                ephemeral: true 
            });
        }
    }
    
    // Handle select menu interactions
    else if (interaction.isStringSelectMenu()) {
        // Handle skill selection, etc.
    }
    
    // Handle modal submissions
    else if (interaction.isModalSubmit()) {
        // Handle form submissions
    }
}

