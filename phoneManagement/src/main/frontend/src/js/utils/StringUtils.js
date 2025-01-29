import {ObjectUtils} from "./objectUtil";
import JaroStringSimilarity from 'string-similarity'

export const StringUtils = {
    toPhoneNumber: (value)=>{
        if(ObjectUtils.isEmpty(value)){
            return ''
        }

        if(value.length > 0 && value.length <= 10){
            return value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        }else if(value.length === 11){
            return value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
        }
        return ''
    },
    // 레벤슈타인 거리 알고리즘
    // 삽입, 삭제, 교체 작업의 최소 횟수를 찾는다
    getLevenshteinDistance: (str1:string, str2:string)=>{
        const len1 = str1.length;
        const len2 = str2.length;

        // Create a 2D array to store distances
        const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

        // Initialize the first row and column
        for (let i = 0; i <= len1; i++) dp[i][0] = i;
        for (let j = 0; j <= len2; j++) dp[0][j] = j;

        // Fill the dp table
        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1]; // Characters match, no operation needed
                } else {
                    dp[i][j] = Math.min(
                        dp[i - 1][j],     // Deletion
                        dp[i][j - 1],     // Insertion
                        dp[i - 1][j - 1]  // Substitution
                    ) + 1;
                }
            }
        }

        // The result is in the bottom-right cell
        return dp[len1][len2];
    },
    getJaroWinklerDistance: (str1:string, str2:string)=>{
        return JaroStringSimilarity.compareTwoStrings(str1, str2);
    },
    replaceDeviceNameToKorean: (str:string)=>{
        return str.replace(/galaxy/i, "갤럭시")
            .replace(/iphone/i,"아이폰")
            .replace(/watch/i,"워치")
            .replace(/fold/i,"폴드")
            .replace(/folder/i,"폴더")
            .replace(/note/i,"노트")
            .replace(/classic/i,"클래식")
            .replace(/tab/i,"탭")
            .replace(/book/i,"북")
            .replace(/flip/i,"플립")
            .replace(/jean/i,"진")
            .replace(/pro/i,"프로")
            .replace(/plus/i,"플러스")
            .replace(/active/i,"액티브")
            .replace(/repackaging/i,"리패키징")
    }
}