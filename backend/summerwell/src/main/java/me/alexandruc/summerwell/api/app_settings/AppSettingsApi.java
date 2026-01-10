package me.alexandruc.summerwell.api.app_settings;

import lombok.AllArgsConstructor;
import me.alexandruc.summerwell.core.app_settings.AppSettingsService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/v1/public/app_settings")
@AllArgsConstructor
public class AppSettingsApi {

    private final AppSettingsService appSettingsService;
    private final AppSettingsMapper appSettingsMapper;

    private Map<String, Object> appSettingsResponse(List<AppSettingsData> appSettingsData) {
        return new HashMap<>() {{
            put("app_settings", appSettingsData);
        }};
    }

    @GetMapping
    public ResponseEntity<?> getAppSettings() {
        List<AppSettingsData> appSettings = appSettingsService.getAllAppSettings().stream()
                .map(appSettingsMapper::toData)
                .collect(Collectors.toList());

        return ResponseEntity.ok(appSettingsResponse(appSettings));
    }

}