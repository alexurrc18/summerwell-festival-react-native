package me.alexandruc.summerwell.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import me.alexandruc.summerwell.entity.AppSettings;

import java.util.Optional;

public interface AppSettingsRepository extends JpaRepository<AppSettings, Integer> {
    Optional<AppSettings> findByOptionName(String optionName);


    
} 
