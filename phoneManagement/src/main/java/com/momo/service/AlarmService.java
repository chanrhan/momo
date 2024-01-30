package com.momo.service;

import com.momo.mapper.AlarmMapper;
import com.momo.vo.SearchVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AlarmService extends CommonService {
	private final AlarmMapper alarmMapper;

	@Override
	public int insert(Map<String ,Object> map) {
		map.put("alarm_id", getMaxId()+1);
		return alarmMapper.insert(map);
	}

	@Override
	public List<Map<String, Object>> search(SearchVO searchVO) {
		return alarmMapper.search(searchVO);
	}

	@Override
	public List<Map<String, Object>> select(Map<String, Object> map) {
		return alarmMapper.select(getSelectQueryString(map));
	}
	@Override
	public Map<String, Object> selectOne(Map<String, Object> map) {
		return select(map).get(0);
	}

	@Override
	public int update(Map<String,Object> map) {
		return alarmMapper.update(map);
	}

	@Override
	public int delete(Map<String,Object> map) {
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
	public List<Map<String,Object>> selectAll() {
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
