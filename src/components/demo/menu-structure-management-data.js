import {ValueType} from "realgrid";
import {Value} from "sass";

export const fields = [
    {
        fieldName: "treeId",
        dataType: ValueType.TEXT
    },
    {
        fieldName: "menuId",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "topMenuId",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "menuDepth",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "menuName",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "menuUrl",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "displayId",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "useYn",
        dataType: ValueType.TEXT,
    },
    {
        fieldName: "sortId",
        dataType: ValueType.TEXT,
    },
];

export const columns = [
    {
        name: "menuId",
        fieldName: "menuId",
        width: "80",
        header: {
            text: "메뉴번호",
        },
    },
    {
        name: "topMenuId",
        fieldName: "topMenuId",
        width: "80",
        header: {
            text: "상위메뉴번호",
        },
    },
    {
        name: "menuDepth",
        fieldName: "menuDepth",
        width: "80",
        header: {
            text: "메뉴깊이",
        },
    },
    {
        name: "menuName",
        fieldName: "menuName",
        width: "80",
        header: {
            text: "메뉴명",
        },
    },
    {
        name: "menuUrl",
        fieldName: "menuUrl",
        width: "80",
        header: {
            text: "메뉴URL",
        },
    },
    {
        name: "displayId",
        fieldName: "displayId",
        width: "80",
        header: {
            text: "화면번호",
        },
    },
    {
        name: "useYn",
        fieldName: "useYn",
        width: "80",
        header: {
            text: "사용여부",
        },
    },
    {
        name: "sortId",
        fieldName: "sortId",
        width: "80",
        header: {
            text: "정렬번호",
        },
    },
];

export const rows = [
    {
        treeId: "1",
        menuId: "9000",
        topMenuId: "",
        menuDepth: "1",
        menuName: "관리자",
        menuUrl: "/admin",
        displayId: "",
        useYn: "Y",
        sortId: "9"
    },
    {
        treeId: "1.001",
        menuId: "9100",
        topMenuId: "9000",
        menuDepth: "2",
        menuName: "사용자관리",
        menuUrl: "/manageUser",
        displayId: "",
        useYn: "Y",
        sortId: "1"
    },
    {
        treeId: "1.001.001",
        menuId: "9101",
        topMenuId: "9100",
        menuDepth: "3",
        menuName: "사용자관리",
        menuUrl: "/CMN9001",
        displayId: "9001",
        useYn: "Y",
        sortId: "1"
    },
    {
        treeId: "1.001.002",
        menuId: "9102",
        topMenuId: "9100",
        menuDepth: "3",
        menuName: "부서관리",
        menuUrl: "/CMN9002",
        displayId: "9002",
        useYn: "Y",
        sortId: "2"
    },
    {
        treeId: "1.001.003",
        menuId: "9104",
        topMenuId: "9100",
        menuDepth: "3",
        menuName: "부서별상품관리",
        menuUrl: "/CMN9010",
        displayId: "9010",
        useYn: "N",
        sortId: "5"
    },
];
