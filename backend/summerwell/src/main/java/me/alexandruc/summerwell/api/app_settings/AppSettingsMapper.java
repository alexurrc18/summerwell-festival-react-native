package me.alexandruc.summerwell.api.app_settings;

import me.alexandruc.summerwell.core.app_settings.AppSettings;
import org.springframework.stereotype.Component;

@Component
public class AppSettingsMapper {
    
    public AppSettingsData toData(AppSettings appSettings) {
        if (appSettings == null) return null;

        AppSettingsData data = new AppSettingsData();
        data.setId(appSettings.getId());
        data.setOptionName(appSettings.getOptionName());
        data.setValue(appSettings.getValue());
        
        return data;
    }
}