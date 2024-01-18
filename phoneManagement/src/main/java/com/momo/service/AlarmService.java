package com.momo.service;

import com.momo.mapper.AlarmMapper;
import com.momo.vo.AlarmVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlarmService implements DefaultCRUDService<AlarmVO,AlarmVO> {
	private final AlarmMapper alarmMapper;


	@Override
	public int insert(AlarmVO key) {
		return alarmMapper.insert(key);
	}

	@Override
	public List<AlarmVO> select(AlarmVO key) {
		return select(key);
	}

	@Override
	public AlarmVO selectOne(AlarmVO key) {
		return select(key).get(0);
	}

	public List<AlarmVO> selectByReceiver(String receiver){
		return alarmMapper.selectByReceiver(receiver);
	}

	@Override
	public int update(AlarmVO key) {
		return alarmMapper.update(key);
	}

	@Override
	public int delete(AlarmVO key) {
		return alarmMapper.delete(key);
	}

	@Override
	public List<AlarmVO> selectAll() {
		return alarmMapper.selectAll();
	}
}
