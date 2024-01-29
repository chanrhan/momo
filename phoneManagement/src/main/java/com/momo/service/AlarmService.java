package com.momo.service;

import com.momo.mapper.AlarmMapper;
import com.momo.vo.AlarmVO;
import com.momo.vo.CommonVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AlarmService extends CommonService<AlarmVO,AlarmVO> {
	private final AlarmMapper alarmMapper;

	@Override
	public int insert(AlarmVO key) {
		key.setAlarmId(getMaxId()+1);
		return alarmMapper.insert(key);
	}

	@Override
	public List<AlarmVO> search(CommonVO commonVO) {
		return alarmMapper.search(commonVO);
	}

	@Override
	public List<AlarmVO> select(AlarmVO map) {
		return alarmMapper.select(getSelectQueryString(map));
	}
	@Override
	public AlarmVO selectOne(AlarmVO map) {
		return select(map).get(0);
	}

	@Override
	public int update(AlarmVO map) {
		return alarmMapper.update(map);
	}

	@Override
	public int delete(AlarmVO map) {
		return alarmMapper.delete(map);
	}

	public int getMaxId(){
		Integer result = alarmMapper.getMaxId();
		if(result == null){
			return 0;
		}
		return result;
	}

	@Override
	public List<AlarmVO> selectAll() {
		return alarmMapper.selectAll();
	}

	public int approve(int alarmId){
		return alarmMapper.approve(alarmId);
	}

	public int readAll(List<Integer> alarmList){
		int result = 0;
		for(int alarmId : alarmList){
			result += read(alarmId);
		}
		return result;
	}

	public int read(int alarmId){
		return alarmMapper.read(alarmId);
	}
}
