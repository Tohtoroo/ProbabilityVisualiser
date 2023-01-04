// general functions

function updateSettingsDesmos(calculator) {
    calculator.updateSettings({fontSize: Desmos.FontSizes.SMALL});
    var newDefaultState = calculator.getState();
    calculator.setDefaultState(newDefaultState);
    
}

function plotIntegralArea(calculator, minimum, maximum, steps, aVal, bVal) {
    calculator.setExpression({id: 'integral', latex: 'A=\\int_{a}^{b}f\\left(z\\right)dz'});
    calculator.setExpression({id: 'area', latex: '\\left\\{f\\left(x\\right)>0: 0, f\\left(x\\right)<0: f\\left(x\\right)\\right\\}<y<\
    \\left\\{f\\left(x\\right)>0:f\\left(x\\right), f\\left(x\\right)<0: 0\\right\\}\\left\\{a<x<b,b<x<a\\right\\}', color: Desmos.Colors.BLUE});  
 
    var initA = aVal || (maximum - minimum) / 2
    var initB = bVal || (maximum - minimum) / 2
    var increment = steps || ''
    
    calculator.setExpression({latex: `a = ${initA}`, sliderBounds: { min: minimum, max: maximum, step: increment }});
    calculator.setExpression({latex: `b = ${initB}`, sliderBounds: { min: minimum, max: maximum, step: increment }});
    calculator.setExpression({latex: '(a, 0)', secret : true, color: Desmos.Colors.BLACK});
    calculator.setExpression({latex: '(b, 0)', secret : true, color: Desmos.Colors.BLACK});
}


function sumDiscreteProb(calculator, sumMin, sumMax, functionName) {
    calculator.setExpression({id: 'a', latex: `a = ${sumMin}`, sliderBounds: {min: sumMin, max: sumMax, step: 1}});
    calculator.setExpression({id: 'b', latex: `b = ${sumMax/2}`, sliderBounds: {min: sumMin, max: sumMax, step: 1}});
    calculator.setExpression({id: 'graph4', latex: `L = [a...b]`, secret: true, color: Desmos.Colors.BLUE});
    
    calculator.setExpression({id: 'sum', latex: `(L, ${functionName}(L)t)`});
    calculator.setExpression({id: 'sum2', latex: `P = \\sum_{i=a}^{b}{${functionName}(i)}`, color: Desmos.Colors.BLUE});
}

function discreteListCreator(calculator, functionName, minimum, maximum, sumA, sumB) {
    calculator.setExpression({id: 'graph2', latex: `n = [${minimum}...${maximum}]`, secret: true});
    calculator.setExpression({id: 'graph3', latex: `(n, ${functionName}(n))`, secret: true, color: Desmos.Colors.BLUE});

    var sumMin = sumA || minimum
    var sumMax = sumB || maximum
    sumDiscreteProb(calculator, sumMin, sumMax, functionName)
}


// discrete distributions

function plotGeom(elementId) {

    var elt = document.getElementById(elementId);
    var calculator = Desmos.GraphingCalculator(elt, {keypad:false, settingsMenu:false, expressionsTopbar:false, expressionsCollapsed:true, 
        showGrid: false, yAxisStep: 0.1, zoomFit: true, showResetButtonOnGraphpaper:true, yAxisLabel:"Probability Mass"});
    
    calculator.setMathBounds({left: -2, right: 20, bottom: -0.1, top: 1});
    calculator.setExpression({id: 'graph1', latex: 'f(x) = \\left(1-p\\right)^{\\operatorname{floor}\\left(x\\right)}p', secret: true, hidden: true});
    calculator.setExpression({id: 'p', latex: 'p = 0.5', sliderBounds: { min: 0, max: 1}});
    
    
    discreteListCreator(calculator, "f", 0, 9999, 0, 50)


    updateSettingsDesmos(calculator)
}


function plotBinomial(elementId) {
    var elt = document.getElementById(elementId);
    var calculator = Desmos.GraphingCalculator(elt, {keypad:false, settingsMenu:false, expressionsTopbar:false,expressionsCollapsed:true, 
        showGrid: false, yAxisStep: 0.1, zoomFit: true, showResetButtonOnGraphpaper:true, yAxisLabel:"Probability Mass"});
    calculator.setMathBounds({left: -0.1, right: 10, bottom: -0.1, top: 1});
    calculator.setExpression({id: 'graph1', latex: '\\operatorname{binomialdist}\\left(n,\\ p\\right)'});
    calculator.setExpression({latex: 'n=10', sliderBounds: { min: 0, max: 10, step: 1}});
    calculator.setExpression({latex: 'p=0.5', sliderBounds: { min: 0, max: 1}});
   
    updateSettingsDesmos(calculator)
    
}

function plotPoisson(elementId) {
    var elt = document.getElementById(elementId);
    var calculator = Desmos.GraphingCalculator(elt, {keypad:false, settingsMenu:false, expressionsTopbar:false,expressionsCollapsed:true, 
        showGrid: false, yAxisStep: 0.1, zoomFit: true, showResetButtonOnGraphpaper:true, yAxisLabel:"Probability Mass"});
    calculator.setMathBounds({left: -0.1, right: 10, bottom: -0.1, top: 1});
    calculator.setExpression({id: 'graph1', latex: '\\operatorname{poissondist}\\left(\\lambda\\right)'});
    calculator.setExpression({latex: '\\lambda=0', sliderBounds: { min: 0, max: 10, step: 1}});
   
    updateSettingsDesmos(calculator)
    
}

// continuous distributions

function plotExpo(elementId) {
    var elt = document.getElementById(elementId);
    var calculator = Desmos.GraphingCalculator(elt, {keypad:false, settingsMenu:false, expressionsTopbar: false,expressionsCollapsed:true,
        showGrid: false, yAxisStep: 0.1, zoomFit: true, showResetButtonOnGraphpaper:true, yAxisLabel:"Probability Density"});
    calculator.setMathBounds({left: -1, right: 5, bottom: -0.5, top: 4});
    calculator.setExpression({id: 'graph1', latex: 'f(x)=\\left\\{x<0:0,\\lambda e^{-\\lambda x}\\right\\}'});
    calculator.setExpression({latex: '\\lambda  = 1', sliderBounds: { min: 0, max: 10 }});
   
    plotIntegralArea(calculator, 0, 10, '', 1, 2)
    updateSettingsDesmos(calculator)

}

function plotNormal(elementId) {
    var elt = document.getElementById(elementId);
    var calculator = Desmos.GraphingCalculator(elt, {keypad:false, settingsMenu:false, expressionsTopbar:false,expressionsCollapsed:true, 
        showGrid: false, yAxisStep: 0.1, zoomFit: true, showResetButtonOnGraphpaper:true, yAxisLabel:"Probability Density"});
    calculator.setMathBounds({left: -5, right: 5, bottom: -0.5, top: 1});
    calculator.setExpression({id: 'graph1', latex: '\\operatorname{normaldist}\\left(\\mu,\\ \\sigma\\right)'});
    calculator.setExpression({id: 'graph2', latex: '\\operatorname{normaldist}\\left(0,\\ 1\\right)', color: Desmos.Colors.RED});
    calculator.setExpression({latex: '\\mu=0', sliderBounds: { min: -5, max: 5}});
    calculator.setExpression({latex: '\\sigma=1', sliderBounds: { min: 0, max: 10}});
   
    updateSettingsDesmos(calculator)
    
}

function gammaLatex(name) {
    return `\\Gamma (${name}) = \\int_{0}^{\\infty}t^{\\left(${name}-1\\right)}e^{-t}dt`
}

function plotGamma(gammaFunctionElementId, elementId) {

    // GAMMA FN

    var eltIntro = document.getElementById(gammaFunctionElementId);
    var introCalculator = Desmos.GraphingCalculator(eltIntro, {keypad:false, settingsMenu:false, expressionsTopbar: false, expressionsCollapsed: true,
        showGrid: false, yAxisStep: 0.1, zoomFit: true, showResetButtonOnGraphpaper:true});
    introCalculator.setMathBounds({left: -1, right: 8, bottom: -5, top: 50});
    introCalculator.setExpression({id: 'gamma fn', latex: gammaLatex("\\alpha"), color: Desmos.Colors.BLACK});
    introCalculator.setExpression({latex: '(a, \\Gamma(a))', secret : true, color: Desmos.Colors.BLACK, showLabel: true});
    for (let i = 0; i < 11; i ++) {
        var latexString = `(${i}, \\Gamma(${i}))`
        introCalculator.setExpression({latex: latexString, secret : true, color: Desmos.Colors.RED, showLabel: true});
    }

    introCalculator.setExpression({latex: '\\Gamma(a)'});
    introCalculator.setExpression({latex: 'a = 1', sliderBounds: { min: 0, max: 8}});
   
    updateSettingsDesmos(introCalculator)
    
    // GAMMA DIST

    var elt = document.getElementById(elementId);
    var calculator = Desmos.GraphingCalculator(elt, {keypad:false, settingsMenu:false, expressionsTopbar: false, expressionsCollapsed: true,
        showGrid: false, yAxisStep: 0.1, zoomFit: true, showResetButtonOnGraphpaper:true, yAxisLabel:"Probability Density"});
    calculator.setMathBounds({left: -1, right: 5, bottom: -0.5, top: 4});    
    calculator.setExpression({id: 'gamma fn', latex: gammaLatex("w"), secret: true, hidden: true});

    calculator.setExpression({id: 'gamma dist', latex: 'f(x)=\\left\\{x<0:0,\\frac{\\lambda ^ {\\alpha} x ^ {\\left(\\alpha-1\\right)} e^{- \\lambda x}} {\\Gamma(\\alpha) } \\right\\} ', color:Desmos.Colors.BLUE});
    calculator.setExpression({latex: '\\alpha = 1', sliderBounds: { min: 0, max: 10}});
    calculator.setExpression({latex: '\\lambda  = 1', sliderBounds: { min: 0, max: 10}});
    

    calculator.setExpression({id: 'exponential_1', latex: 'g(x)=\\left\\{x<0:0, e^{-x}\\right\\}', color: Desmos.Colors.RED});
   
    plotIntegralArea(calculator, 0, 10, '', 1, 2)
    updateSettingsDesmos(calculator)
}

function plotBeta(elementId) {
    var elt = document.getElementById(elementId);
    var calculator = Desmos.GraphingCalculator(elt, {keypad:false, settingsMenu:false, expressionsTopbar:false,expressionsCollapsed:true, 
        showGrid: false, yAxisStep: 0.1, zoomFit: true, showResetButtonOnGraphpaper:true, yAxisLabel:"Probability Density"});
    calculator.setMathBounds({left: -0.2, right: 1.2, bottom: -0.5, top: 3});


    calculator.setExpression({latex: gammaLatex("i"), secret : true, hidden : true });
    calculator.setExpression({latex: 'B(m, n) = \\frac{\\Gamma(m)\\Gamma(n)}{\\Gamma(m + n)}', secret : false, hidden : true});
    calculator.setExpression({id: 'graph1', latex: ' f(x)= \\left\\{0\\leq x \\leq 1: \\frac{x^{\\left(\\alpha-1\\right)}\\left(1-x\\right)^{\\left(\\beta-1\\right)}}{B(\\alpha, \\beta)}, 0 \\right\\} '});
    calculator.setExpression({latex: '\\alpha = 1', sliderBounds: { min: 0, max: 10, step: 0.01}});
    calculator.setExpression({latex: '\\beta = 1', sliderBounds: { min: 0, max: 10, step: 0.01}});

    plotIntegralArea(calculator, 0, 1, '', 0.2, 0.4)
    updateSettingsDesmos(calculator)

}

function plotUniform(elementId) {
    var elt = document.getElementById(elementId);
    var calculator = Desmos.GraphingCalculator(elt, {keypad:false, settingsMenu:false, expressionsTopbar:false,expressionsCollapsed:true, 
        showGrid: false, yAxisStep: 0.1, zoomFit: true, showResetButtonOnGraphpaper:true, yAxisLabel:"Probability Density"});
    calculator.setMathBounds({left: -5, right: 5, bottom: -0.5, top: 5});
    calculator.setExpression({id: 'graph1', latex: '\\operatorname{uniformdist}\\left(a,\\ b\\right)'});
    calculator.setExpression({latex: 'a=0', sliderBounds: { min: -5, max: 5}});
    calculator.setExpression({latex: 'b=1', sliderBounds: { min: 0, max: 10}});
   
    updateSettingsDesmos(calculator)
    
}

function plotLogNormal(elementId) {
    var elt = document.getElementById(elementId);
    var calculator = Desmos.GraphingCalculator(elt, {keypad:false, settingsMenu:false, expressionsTopbar:false,expressionsCollapsed:true, 
        showGrid: false, yAxisStep: 0.1, zoomFit: true, showResetButtonOnGraphpaper:true, yAxisLabel:"Probability Density"});
    calculator.setMathBounds({left: -0.1, right: 10, bottom: -0.1, top: 1});
    calculator.setExpression({id: 'graph1', latex: 'f(x)=\\left\\{x<0:0, \\frac{1}{x \\sigma \\sqrt{2 \\pi}} e^{-\\frac{\\left(\\ln x - \\mu\\right)^{2}}{2\\sigma^{2}}}\\right\\}'});
    calculator.setExpression({latex: '\\mu=0', sliderBounds: { min: -5, max: 5}});
    calculator.setExpression({latex: '\\sigma=1', sliderBounds: { min: 0, max: 10}});
   
    plotIntegralArea(calculator, 0, 10, '', 1, 2)
    updateSettingsDesmos(calculator)
    
}

function plotT(elementId) {
    var elt = document.getElementById(elementId);
    var calculator = Desmos.GraphingCalculator(elt, {keypad:false, settingsMenu:false, expressionsTopbar:false, expressionsCollapsed:true, 
        showGrid: false, yAxisStep: 0.1, zoomFit: true, showResetButtonOnGraphpaper:true, yAxisLabel:"Probability Density"});
    calculator.setMathBounds({left: -5, right: 5, bottom: -0.5, top: 1});
    calculator.setExpression({id: 'graph1', latex: '\\operatorname{tdist}\\left(\\nu\\right)'});
    calculator.setExpression({latex: '\\nu=0', sliderBounds: { min: 0, max: 20}});
   
    updateSettingsDesmos(calculator)
    
}


