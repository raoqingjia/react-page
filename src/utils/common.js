
/*
得到两个数之间的整数值，不包括最大值
minValue: 表示要生成的随机数的起始值，包括该值(有可能大于等于该值)
maxValue: 表示要生成随机数的终止，不包括该值(小于等于该值)
*/
export function selectFrom(minValue, maxValue) {
    // 通过最大值减去最小值然后加1得到取值的范围可能值的总数
    // 例如取2到10之间的整数，10-2 = 8
    var choices = maxValue - minValue;
    // 然后通过随机数乘以刚才的到的值，
    // 例如：Math.random() * 8，由于得到的是小于1的随机数，所以随机最大值0.99*8得到的数始终小于8
    // 然后使用floor方法向下取正得到的数最大值就是7，然后再加上最小值
    return Math.floor(Math.random() * choices + minValue);
}