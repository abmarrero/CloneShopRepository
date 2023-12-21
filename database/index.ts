
export * from './db';

export * as seedDatabase from './seed-data';

export * from './constants'

export * as dbProduct from './dbProduct';

let nums = [2,7,11,15]; let target = 9;
 let x = 0; 
 const twoSun = (nums: number[], target: number): number[]  => {
    const m = new Map<number, number>();

    for (let i = 0; i < nums.length; i++){
        const n =nums[i];
        const diff = target - n;
        if(m.has(diff)){
            return [m.get(diff)!, i]
            // console.log([m.get(diff)!, target])
        }else
        m.set(n,i)
    }
    return [];
}
console.log(twoSun(nums, target));