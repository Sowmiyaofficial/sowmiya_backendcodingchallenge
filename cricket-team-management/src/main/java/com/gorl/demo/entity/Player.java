package com.gorl.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "players")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Player {

    @Id
    @Column(name = "player_id")
    private Long playerId;

    @Column(name = "player_name", nullable = false, length = 100)
    private String playerName;

    @Column(name = "jersey_number", nullable = false)
    private Integer jerseyNumber;

    @Column(name = "role", nullable = false, length = 50)
    private String role;

    @Column(name = "total_matches", nullable = false)
    private Integer totalMatches;

    @Column(name = "team_name", nullable = false, length = 100)
    private String teamName;

    @Column(name = "country_state_name", nullable = false, length = 100)
    private String countryStateName;

    @Column(name = "description", length = 500)
    private String description;
}