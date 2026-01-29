package me.alexandruc.summerwell.api.app_settings;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({ "id", "option_name", "value" })
public class AppSettingsData {
    
    private Integer id;
    private String optionName;
    private String value;


}