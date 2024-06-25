

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

try {
    console.log(calculateBmi(180, 74))
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if(error instanceof Error) {
        errorMessage += error.message
    }

    console.log(errorMessage)
}