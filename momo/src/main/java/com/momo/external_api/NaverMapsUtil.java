package com.momo.external_api;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class NaverMapsUtil {
    @Value("${momo.navermaps.client_id}")
    public String CLIENT_ID;

    @Value("${momo.navermaps.client_secret}")
    public String CLIENT_SECRET;

}
