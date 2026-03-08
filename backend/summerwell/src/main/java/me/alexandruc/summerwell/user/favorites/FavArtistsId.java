package me.alexandruc.summerwell.user.favorites;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavArtistsId implements Serializable {
    private Long userId;
    private Long artistId;
    
}
