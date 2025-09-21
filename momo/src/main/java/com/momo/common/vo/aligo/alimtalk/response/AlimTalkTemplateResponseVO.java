package com.momo.common.vo.aligo.alimtalk.response;


import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.momo.common.vo.aligo.FormEncodable;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class AlimTalkTemplateResponseVO extends AlimTalkResponseVO {
    // template/list
    private List<AlimTalkTemplateItem> list;
    private AlimTalkTemplateInfo info;

    // template/add
    private String data; // 생성한 템플릿 정보
}
