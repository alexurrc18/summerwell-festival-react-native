package me.alexandruc.summerwell.map;

import java.util.List;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MapService {
    public final MapRepository mapRepository;

    public List<Map> getAllMaps() {
        return mapRepository.findByPublishedTrue();
    }
    
    
}
