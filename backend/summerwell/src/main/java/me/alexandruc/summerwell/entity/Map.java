package me.alexandruc.summerwell.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "map")
@Data
public class Map {
    
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "edition", nullable = false)
    private Integer edition;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "id_category", nullable = true)
    private String idCategory;

    @Column(name = "lon", nullable = false)
    private float lon;

    @Column(name = "lat", nullable = false)
    private float lat;

    @Column(name = "published", nullable = false)
    private Boolean published;

    
}
