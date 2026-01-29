package me.alexandruc.summerwell.core.app_settings;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "app_settings")
@Data
public class AppSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "option_name", nullable = false)
    private String optionName;

    @Column(name = "value", nullable = false)
    private String value;

}
