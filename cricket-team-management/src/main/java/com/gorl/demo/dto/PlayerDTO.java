package com.gorl.demo.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PlayerDTO {

    @NotNull(message = "Player ID is required")
    @Min(value = 1, message = "Player ID must be a positive number")
    private Long playerId;

    @NotBlank(message = "Player name is required")
    @Size(max = 100, message = "Player name must not exceed 100 characters")
    private String playerName;

    @NotNull(message = "Jersey number is required")
    @Min(value = 0, message = "Jersey number cannot be negative")
    private Integer jerseyNumber;

    @NotBlank(message = "Role is required (e.g. Batsman, Bowler, Keeper, All Rounder)")
    @Size(max = 50, message = "Role must not exceed 50 characters")
    private String role;

    @NotNull(message = "Total matches is required")
    @Min(value = 0, message = "Total matches cannot be negative")
    private Integer totalMatches;

    @NotBlank(message = "Team name is required")
    @Size(max = 100, message = "Team name must not exceed 100 characters")
    private String teamName;

    @NotBlank(message = "Country/State name is required")
    @Size(max = 100, message = "Country/State name must not exceed 100 characters")
    private String countryStateName;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;
}