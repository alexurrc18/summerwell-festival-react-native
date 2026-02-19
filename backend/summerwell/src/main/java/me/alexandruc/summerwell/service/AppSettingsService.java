package me.alexandruc.summerwell.service;

import lombok.RequiredArgsConstructor;
import me.alexandruc.summerwell.entity.AppSettings;
import me.alexandruc.summerwell.repository.AppSettingsRepository;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppSettingsService {
    private final AppSettingsRepository appSettingsRepository;

    public List<AppSettings> getAllAppSettings() {
        return appSettingsRepository.findAll();
    }

    public Integer getCurrentEditionYear() {
        return appSettingsRepository.findByOptionName("edition")
                .map(setting -> {
                    try {
                        return Integer.parseInt(setting.getValue());
                    } catch (NumberFormatException e) {
                        return null;
                    }
                })
                .orElse(null);
    }
    
}