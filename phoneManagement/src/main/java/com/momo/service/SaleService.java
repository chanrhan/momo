package com.momo.service;

import com.momo.mapper.SaleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaleService {
	private final SaleMapper saleMapper;
}
