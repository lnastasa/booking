package org.lucia.service;

import org.lucia.dao.HealthDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class HealthService {

    @Autowired
    private HealthDao healthDao;

    public Map<String, Object> health() {

        boolean isDatabaseConnected = healthDao.isHealthy();

        Map<String, Object> response = new HashMap<>();
        response.put("status", "healthy");
        response.put("databaseConnected", isDatabaseConnected);
        return response;
    }
}
