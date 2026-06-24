package com.gorl.demo.service;

import com.gorl.demo.dto.PlayerDTO;
import com.gorl.demo.entity.Player;
import com.gorl.demo.exception.DuplicateResourceException;
import com.gorl.demo.exception.ResourceNotFoundException;
import com.gorl.demo.repo.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlayerServiceImpl implements PlayerService {

    private final PlayerRepository playerRepository;

    public PlayerServiceImpl(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Override
    public List<PlayerDTO> getAllPlayers() {
        return playerRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PlayerDTO getPlayerById(Long playerId) {
        Player player = playerRepository.findById(playerId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Player not found with id: " + playerId));
        return toDTO(player);
    }

    @Override
    public PlayerDTO createPlayer(PlayerDTO dto) {
        if (playerRepository.existsById(dto.getPlayerId())) {
            throw new DuplicateResourceException(
                    "Player already exists with id: " + dto.getPlayerId());
        }
        if (playerRepository.existsByJerseyNumber(dto.getJerseyNumber())) {
            throw new DuplicateResourceException(
                    "Jersey number already taken: " + dto.getJerseyNumber());
        }
        Player saved = playerRepository.save(toEntity(dto));
        return toDTO(saved);
    }

    @Override
    public PlayerDTO updatePlayer(Long playerId, PlayerDTO dto) {
        Player existing = playerRepository.findById(playerId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Player not found with id: " + playerId));

        if (!existing.getJerseyNumber().equals(dto.getJerseyNumber())
                && playerRepository.existsByJerseyNumber(dto.getJerseyNumber())) {
            throw new DuplicateResourceException(
                    "Jersey number already taken: " + dto.getJerseyNumber());
        }

        existing.setPlayerName(dto.getPlayerName());
        existing.setJerseyNumber(dto.getJerseyNumber());
        existing.setRole(dto.getRole());
        existing.setTotalMatches(dto.getTotalMatches());
        existing.setTeamName(dto.getTeamName());
        existing.setCountryStateName(dto.getCountryStateName());
        existing.setDescription(dto.getDescription());

        return toDTO(playerRepository.save(existing));
    }

    @Override
    public void deletePlayer(Long playerId) {
        Player existing = playerRepository.findById(playerId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Player not found with id: " + playerId));
        playerRepository.delete(existing);
    }

    private PlayerDTO toDTO(Player p) {
        PlayerDTO dto = new PlayerDTO();
        dto.setPlayerId(p.getPlayerId());
        dto.setPlayerName(p.getPlayerName());
        dto.setJerseyNumber(p.getJerseyNumber());
        dto.setRole(p.getRole());
        dto.setTotalMatches(p.getTotalMatches());
        dto.setTeamName(p.getTeamName());
        dto.setCountryStateName(p.getCountryStateName());
        dto.setDescription(p.getDescription());
        return dto;
    }

    private Player toEntity(PlayerDTO dto) {
        Player p = new Player();
        p.setPlayerId(dto.getPlayerId());
        p.setPlayerName(dto.getPlayerName());
        p.setJerseyNumber(dto.getJerseyNumber());
        p.setRole(dto.getRole());
        p.setTotalMatches(dto.getTotalMatches());
        p.setTeamName(dto.getTeamName());
        p.setCountryStateName(dto.getCountryStateName());
        p.setDescription(dto.getDescription());
        return p;
    }
}