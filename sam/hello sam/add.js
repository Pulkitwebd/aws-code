exports.handler = async (event) => {
    let {num1 , num2} = JSON.parse(event.body);
    return {
        statusCode : 200,
        num1 : num1,
        num2 : num2,
        result : num1 + num2
    }
}