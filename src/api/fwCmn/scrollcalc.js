export default class ScrollCalc {
	searchComplete 	= true
    loading = false

    isScrollAction(e, HeightRatio, listTotal, tableLength) {
        // 오차범위 1 더해주기 (전혁준)
        const limitTop = e.target.scrollTop / e.target.scrollHeight * 100 + 1
        // console.log('e.target.scrollTop ::: ' + e.target.scrollTop)
        // console.log('e.target.scrollHeight::: ' + e.target.scrollHeight)
        // console.log('limitTop::: ' + limitTop)
        // console.log('HeightRatio::: ' + HeightRatio)
        if (limitTop < HeightRatio || listTotal <= tableLength) {
            return -1
        } else {
            return 1
        }
    }
}
