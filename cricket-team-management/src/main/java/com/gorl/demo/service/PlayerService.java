package com.gorl.demo.service;

import com.gorl.demo.dto.PlayerDTO;

import java.util.List;

public interface PlayerService {

    List<PlayerDTO> getAllPlayers();

    PlayerDTO getPlayerById(Long playerId);

    PlayerDTO createPlayer(PlayerDTO playerDTO);

    PlayerDTO updatePlayer(Long playerId, PlayerDTO playerDTO);

    void deletePlayer(Long playerId);
}