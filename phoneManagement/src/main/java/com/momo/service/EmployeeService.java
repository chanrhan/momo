package com.momo.service;

import com.momo.mapper.EmployeeMapper;
import com.momo.vo.CommonVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmployeeService extends CommonService {
	private final EmployeeMapper employeeMapper;

	@Override
	public int insert(Map<String,Object> map) {
		return employeeMapper.insert(map);
	}

	@Override
	public List<Map<String,Object>> select(Map<String,Object> map) {
		return employeeMapper.select(getSelectQueryString(map));
	}

	@Override
	public List<Map<String, Object>> search(CommonVO commonVO) {
		return employeeMapper.search(commonVO);
	}

	public Map<String,Object> selectById(String id){
		return employeeMapper.selectById(id);
	}

	@Override
	public Map<String,Object> selectOne(Map<String,Object> key) {
		return select(key).get(0);
	}

	@Override
	public int update(Map<String,Object> key) {
		return employeeMapper.update(key);
	}

	public int updateShop(Map<String,Object> map){
		Map<String,Object> empMap = employeeMapper.selectById(map.get("id").toString());
		empMap.put("shop_cd", map.get("shop_cd"));
		return employeeMapper.updateShop(empMap);
	}

	@Override
	public int delete(Map<String,Object> key) {
		return employeeMapper.delete(key);
	}

	@Override
	public List<Map<String,Object>> selectAll() {
		return employeeMapper.selectAll();
	}
}
