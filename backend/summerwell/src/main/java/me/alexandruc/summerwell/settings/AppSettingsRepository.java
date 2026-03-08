package me.alexandruc.summerwell.settings;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppSettingsRepository extends JpaRepository<AppSettings, Integer> {
    Optional<AppSettings> findByOptionName(String optionName);


    
} 
