package org.lucia.service.health;

import org.lucia.dao.health.HealthDao;
import org.lucia.model.health.HealthReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class HealthService {

    @Autowired
    private HealthDao healthDao;

    public Map<String, Object> health() {

        HealthReport healthReport = healthDao.isHealthy();

        Map<String, Object> response = new HashMap<>();
        response.put("status", "healthy");
        response.put("databaseConnected", healthReport.isHealthy());
        return response;
    }
}
