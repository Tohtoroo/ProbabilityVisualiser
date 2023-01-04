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
    calculator.setExpression({id: 'a', latex: `a = ${sumMin}`, sliderBounds: {min: Math.max(sumMin, -10), max: sumMax, step: 1}});
    calculator.setExpression({id: 'b', latex: `b = ${sumMax/2}`, sliderBounds: {min: Math.max(sumMin, -10), max: sumMax, step: 1}});
    calculator.setExpression({id: 'graph4', latex: `L = [a...b]`, secret: true, color: Desmos.Colors.BLUE});

    calculator.setExpression({id: 'sum', latex: `(L, ${functionName}(L)t)`, color: Desmos.Colors.BLUE, secret: true});
    calculator.setExpression({id: 'sum2', latex: `P = \\sum_{i=a}^{b}{${functionName}(i)}`, color: Desmos.Colors.BLUE});
}

function discreteListCreator(calculator, functionName, minimum, maximum, sumA, sumB) {
    calculator.setExpression({id: 'graph2', latex: `J = [${minimum}...${maximum}]`, secret: true});
    calculator.setExpression({id: 'graph3', latex: `(J, ${functionName}(J))`, secret: true, color: Desmos.Colors.BLUE});

    var sumMin = sumA || minimum
    var sumMax = sumB || maximum
    sumDiscreteProb(calculator, sumMin, sumMax, functionName)
}


// discrete distributions

function plotDiscUniform(elementId) {
    var elt = document.getElementById(elementId);
    var calculator = Desmos.GraphingCalculator(elt, {keypad:false, settingsMenu:false, expressionsTopbar:false,expressionsCollapsed:true, 
        showGrid: false, yAxisStep: 0.1, zoomFit: true, showResetButtonOnGraphpaper:true, yAxisLabel:"Probability Density"});
    calculator.setMathBounds({left: -2, right: 10, bottom: -0.1, top: 0.6});
    
    calculator.setExpression({id: 'graph1', latex: 'f(x)=\\left\\{ x<u : 0, x>v:0, \\frac{1}{v - u + 1} \\right\\}', hidden: true, secret: true});
    calculator.setExpression({latex: 'u=0', sliderBounds: { min: -5, max: 10, step: 1}});
    calculator.setExpression({latex: 'v=4', sliderBounds: { min: -5, max: 10, step: 1}});
    

    discreteListCreator(calculator, "f", -4000, 4099, 0, 50)
    updateSettingsDesmos(calculator)
    
}


function plotBernoulli(elementId) {
    var elt = document.getElementById(elementId);
    var calculator = Desmos.GraphingCalculator(elt, {keypad:false, settingsMenu:false, expressionsTopbar:false,expressionsCollapsed:true, 
        showGrid: false, yAxisStep: 0.1, zoomFit: true, showResetButtonOnGraphpaper:true, yAxisLabel:"Probability Mass"});
    calculator.setMathBounds({left: -0.1, right: 1.5, bottom: -0.1, top: 1});
    // using built-in binomial dist function with n set to 1; confusing?s
    calculator.setExpression({id: 'graph1', latex: '\\operatorname{binomialdist}\\left(1,\\ p\\right)'});
    calculator.setExpression({latex: 'p=0.5', sliderBounds: { min: 0, max: 1}});
   
    updateSettingsDesmos(calculator)
    
}

function plotNegBinomial(elementId) {
    var elt = document.getElementById(elementId);
    var calculator = Desmos.GraphingCalculator(elt, {keypad:false, settingsMenu:false, expressionsTopbar:false, expressionsCollapsed:true, 
        showGrid: false, yAxisStep: 0.1, zoomFit: true, showResetButtonOnGraphpaper:true, yAxisLabel:"Probability Mass"});

    var latexString = " f(x) = \\operatorname{nCr}\\left(\\operatorname{floor}\\left(x\\right)+R-1, \\operatorname{floor}\\left(x\\right)\\right)\\cdot p^{R}\\cdot\\left(1-p\\right)^{\\operatorname{floor}\\left(x\\right)}"
    calculator.setMathBounds({left: -2, right: 20, bottom: -0.1, top: 1});
    calculator.setExpression({id: 'graph1', latex: latexString, secret: true, hidden: true}); 
    calculator.setExpression({id: 'p', latex: 'p = 0.5', sliderBounds: { min: 0, max: 1}});
    calculator.setExpression({id: 'r', latex: 'R = 10', sliderBounds: { min: 0, max: 100, step: 1}, hidden: true});

    discreteListCreator(calculator, "f", 0, 9999, 0, 50)
    updateSettingsDesmos(calculator)
}

function plotHyperGeom(elementId) {
    var elt = document.getElementById(elementId);
    var calculator = Desmos.GraphingCalculator(elt, {keypad:false, settingsMenu:false, expressionsTopbar:false, expressionsCollapsed:true, 
        showGrid: false, yAxisStep: 0.1, zoomFit: true, showResetButtonOnGraphpaper:true, yAxisLabel:"Probability Mass"});
    
    var latexString = 'f(x) = \\frac{ \\operatorname{nCr}\\left(m, \\operatorname{floor}\\left(x\\right)\\right)}{\\operatorname{nCr}\\left(N,n\\right)} \\operatorname{nCr}\\left(N-m,n-\\operatorname{floor}\\left(x\\right)\\right)'
    calculator.setMathBounds({left: -2, right: 20, bottom: -0.1, top: 1});
    calculator.setExpression({id: 'graph1', latex: latexString, secret: true, hidden: true}); 
    calculator.setExpression({id: 'p', latex: 'p = 0.5', sliderBounds: { min: 0, max: 1}});
    
    calculator.setExpression({id: 'N', latex: "N=36", sliderBounds: { min: 0, max: 100, step: 1}});
    calculator.setExpression({id: 'm', latex: "m=19", sliderBounds: { min: 0, max: 100, step: 1}});
    calculator.setExpression({id: 'n', latex: "n=14", sliderBounds: { min: 0, max: 100, step: 1}});


    discreteListCreator(calculator, "f", 0, 9999, 0, 50)
    updateSettingsDesmos(calculator)

}

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

function plotContUniform(elementId) {
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

function plotChiChi(elementId) {
    var elt = document.getElementById(elementId);
    var calculator = Desmos.GraphingCalculator(elt, {keypad:false, settingsMenu:false, expressionsTopbar:false, expressionsCollapsed:true, 
        showGrid: false, yAxisStep: 0.1, zoomFit: true, showResetButtonOnGraphpaper:true, yAxisLabel:"Probability Density"});

    calculator.setMathBounds({left: -1, right: 10, bottom: -0.1, top: 0.5});
    calculator.setExpression({latex: 'k=1', sliderBounds: { min: 1, max: 20, step: 1}});
    calculator.setExpression({id: 'gamma fn', latex: gammaLatex("\\alpha"), hidden: true});
    calculator.setExpression({id: 'graph1', latex: 'f(x)=\\left\\{x<0:0, \\frac{x^{\\frac{k}{2} -1} e^{\\frac{-x}{2}}}{2^{\\frac{k}{2}}  \\Gamma(\\frac{k}{2}) }   \\right\\}',  color:Desmos.Colors.BLUE});


    plotIntegralArea(calculator, 0, 100, '', 1, 2)
    updateSettingsDesmos(calculator)

}


