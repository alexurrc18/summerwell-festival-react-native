package me.alexandruc.summerwell.service;

import java.util.List;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import me.alexandruc.summerwell.entity.Map;
import me.alexandruc.summerwell.repository.MapRepository;

@Service
@RequiredArgsConstructor
public class MapService {
    public final MapRepository mapRepository;

    public List<Map> getAllMaps() {
        return mapRepository.findByPublishedTrue();
    }
    
    
}
