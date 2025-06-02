package com.momo.service;

import com.momo.common.SolvedAcRequestVO;
import com.momo.common.SolvedAcResponseVO;
import com.momo.mapper.SolvedAcMapper;
import com.momo.utils.ExternalApiUtils;
import com.momo.utils.TimeUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class SolvedAcService {
	private final SolvedAcMapper solvedAcMapper;

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

	public boolean getLoginedUserInfo(){
//		String uri = "https://solved.ac/api/v3/account/verify_credentials";
		String uri = "https://solved.ac/api/v3/search/user?query=km1104rs";
        try {
            ExternalApiUtils.solvedacAPIRequest(uri);
        } catch (IOException e) {
            return false;
        } catch (InterruptedException e) {
            return false;
        }
		return true;
    }

    public List<List<SolvedAcResponseVO>> getPage(SolvedAcRequestVO vo){
        try {
            List<List<SolvedAcResponseVO>> list = new ArrayList<>();
            LocalDate fromDt = LocalDate.parse(vo.getFromDate(), formatter);
            LocalDate toDt = LocalDate.parse(vo.getToDate(), formatter);
            for(String username : vo.getUsernames()){
                List<SolvedAcResponseVO> problemList = new ArrayList<>();
                int top = -1;
                do{
                    List<SolvedAcResponseVO> res = getPageResponse(username, fromDt, toDt, vo.getProblemId(), top, vo.getResultId());
                    if(res == null || res.isEmpty()){
                        break;
                    }
                    problemList.addAll(res);
                    int bottom = res.get(res.size()-1).getSubmitId();
                    if(top == bottom){
                        break;
                    }
                    top = bottom;
                }while (top > 0);
                list.add(problemList);
            }
           return list;
        } catch (IOException e) {
            return null;
        }
    }

    private List<SolvedAcResponseVO> getPageResponse(String username, LocalDate fromDate, LocalDate toDate, int problemId, int top, Integer resultId) throws IOException {
        System.out.println("username: "+username+", result_id:" + resultId);
        Connection connection = Jsoup.connect("https://www.acmicpc.net/status?user_id="+username+"&problem_id="+problemId + "&top=" + top + "&result_id="+resultId);
        Document document = connection.get(); // GET 으로 요청하고, 요청 결과를 Document 객체로 반환
        Elements elements = document.getElementsByAttributeValue("id","status-table");
        Element element = elements.get(0);

        Element tbody = element.children().get(1);
        List<SolvedAcResponseVO> list = new ArrayList<>();
        try{
            int maxLength = tbody.children().size();
            for(int i=0;i<maxLength;++i){
                Element row = tbody.child(i);
                Elements selects = row.select("td a.real-time-update.show-date");

                if(selects != null){
                    Element a = selects.get(0);
                    long timestamp = Long.parseLong(a.attr("data-timestamp"));
                    LocalDate dateTime = TimeUtils.parseTimestamp(timestamp).toLocalDate();
                    if(dateTime.isAfter(fromDate) && dateTime.isBefore(toDate)){
//                        Element result = row.select("td.result").get(0);
                        String submitId = row.select("td").get(0).text();
                        System.out.println("submit id: " + submitId);

//                        SolvedAcResultType resultType = SolvedAcResultType.valueOf(result.text());

//                        System.out.println("result: " +resultType.name());
                        list.add(SolvedAcResponseVO.builder()
                                .username(username)
                                .problemId(problemId)
                                        .resultId(resultId)
                                .submitId(Integer.parseInt(submitId))
                                .date(dateTime)
                                .build());
                    }
                }
            }
        }catch (Exception e){
            return null;
        }

        return list;
    }

}
