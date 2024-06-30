
const calculateBmi = (height: number, weight: number): string => {
    
    const bmi = Math.round(weight / Math.pow((height/100), 2) * 100) /100
    
    if (bmi < 18.5) {
        return `BMI at ${bmi}: result underweight`
    }
    else if (bmi < 25.0) {
        return `BMI at ${bmi}: result normal weight`
    }
    else if (bmi < 30.0) {
        return `BMI at ${bmi}: result overweight`
    }
    else  {
        return `BMI at ${bmi}: result Obese`
    }
}

    const height: number = Number(process.argv[2])
    const weight: number = Number(process.argv[3])

try {
    console.log(calculateBmi(height, weight))
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if(error instanceof Error) {
        errorMessage += error.message
    }

    console.log(errorMessage)
}

export default { calculateBmi }