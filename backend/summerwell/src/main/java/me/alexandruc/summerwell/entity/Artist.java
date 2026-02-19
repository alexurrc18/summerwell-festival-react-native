package me.alexandruc.summerwell.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;

@Entity
@Table(name = "artists")
@Data
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artist_id")
    private Long id;

    @ManyToOne 
    @JoinColumn(name = "stage_id", nullable = false)
    private Stage stage;

    @Column(nullable = false, length = 24)
    private String name;

    @Column(length = 500, nullable = false)
    private String image;

    @Column(name = "year", nullable = false)
    private Integer eventYear;

    @Column(name = "date", nullable = false)
    private Integer dayNumber;

    @Column(name = "act_start", nullable = false)
    private LocalTime actStart;

    @Column(name = "act_end", nullable = false)
    private LocalTime actEnd;

    @Column(name = "priority", nullable = true)
    private Integer priority;

    @Column(name = "description", columnDefinition = "TEXT", nullable = true)
    private String description;

    @Column(name = "url_instagram", nullable = true)
    private String urlInstagram;

    @Column(name = "url_spotify", nullable = true)
    private String urlSpotify;

    @Column(name = "published", nullable = false)
    private Boolean published;
}