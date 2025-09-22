import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, Trophy, Brain, Code, Cpu, Sparkles, Zap, Star, BookOpen } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Quines són les 3 operacions bàsiques que pot realitzar un ordinador?",
    options: [
      "Calcular, emmagatzemar i comunicar",
      "Operacions aritmètiques, operacions lògiques i emmagatzematge/recuperació d'informació",
      "Llegir, processar i escriure",
      "Entrada, processament i sortida"
    ],
    correct: 1,
    explanation: "Un ordinador pot realitzar operacions aritmètiques bàsiques, operacions de tipus lògic (comparar valors) i emmagatzematge/recuperació d'informació.",
    category: "Introducció"
  },
  {
    id: 2,
    question: "Què és un algorisme?",
    options: [
      "Un programa escrit en llenguatge de programació",
      "Una seqüència de passos per resoldre un problema",
      "Un tipus de variable en programació",
      "Un compilador de codi"
    ],
    correct: 1,
    explanation: "Un algorisme és la descripció exacta i sense ambigüitats de la seqüència de passos elementals per resoldre un problema determinat.",
    category: "Algorismes"
  },
  {
    id: 3,
    question: "Quin és l'ordre correcte del flux d'un programa?",
    options: [
      "Processament - Entrada de dades - Sortida de dades",
      "Sortida de dades - Processament - Entrada de dades",
      "Entrada de dades - Processament - Sortida de dades",
      "Entrada de dades - Sortida de dades - Processament"
    ],
    correct: 2,
    explanation: "El flux correcte d'un programa és: Entrada de dades → Processament → Sortida de dades.",
    category: "Algorismes"
  },
  {
    id: 4,
    question: "Què és el codi màquina?",
    options: [
      "Codi escrit en llenguatge d'alt nivell",
      "Codi format només per uns i zeros que entén l'ordinador",
      "Codi escrit en assemblador",
      "Codi intermig generat pel compilador"
    ],
    correct: 1,
    explanation: "El codi màquina està compost només d'uns i zeros, és l'únic que entén directament l'ordinador.",
    category: "Llenguatges"
  },
  {
    id: 5,
    question: "Quin tipus de llenguatge és l'assemblador?",
    options: [
      "Llenguatge d'alt nivell",
      "Llenguatge de baix nivell",
      "Llenguatge de nivell intermig",
      "Llenguatge màquina"
    ],
    correct: 2,
    explanation: "L'assemblador és un llenguatge de nivell intermig que utilitza paraules nemotècniques en lloc de codi binari.",
    category: "Llenguatges"
  },
  {
    id: 6,
    question: "Quina característica tenen els llenguatges d'alt nivell?",
    options: [
      "Són incompatibles entre diferents microprocessadors",
      "Utilitzen només uns i zeros",
      "Són fàcils d'entendre i aprendre, i són compatibles entre microprocessadors",
      "Manipulen directament els registres del processador"
    ],
    correct: 2,
    explanation: "Els llenguatges d'alt nivell són fàcils d'entendre i no hi ha incompatibilitats entre microprocessadors.",
    category: "Llenguatges"
  },
  {
    id: 7,
    question: "Quin llenguatge va ser creat per Guido van Rossum l'any 1991?",
    options: [
      "Java",
      "Python",
      "JavaScript",
      "C"
    ],
    correct: 1,
    explanation: "Python va ser creat per Guido van Rossum l'any 1991, amb una filosofia de disseny que busca llegibilitat en el codi.",
    category: "Llenguatges"
  },
  {
    id: 8,
    question: "Quina és la principal diferència entre un compilador i un intèrpret?",
    options: [
      "El compilador és més ràpid que l'intèrpret",
      "Un compilador genera codi objecte, mentre que l'intèrpret executa directament sense generar cap fitxer intermig",
      "L'intèrpret només funciona amb llenguatges d'alt nivell",
      "El compilador només funciona amb Java"
    ],
    correct: 1,
    explanation: "Un compilador genera un fitxer de codi objecte, mentre que l'intèrpret tradueix i executa directament instrucció per instrucció.",
    category: "Traductors"
  },
  {
    id: 9,
    question: "Què fa un assemblador?",
    options: [
      "Tradueix codi d'alt nivell a codi màquina",
      "Executa programes directament",
      "Tradueix codi assemblador a codi màquina",
      "Optimitza el codi font"
    ],
    correct: 2,
    explanation: "Un assemblador tradueix el codi d'un programa escrit en assemblador a codi màquina comprensible per l'ordinador.",
    category: "Traductors"
  },
  {
    id: 10,
    question: "Quina és la primera fase en el desenvolupament d'un programa?",
    options: [
      "Implementació",
      "Disseny",
      "Anàlisi",
      "Documentació"
    ],
    correct: 2,
    explanation: "L'anàlisi és la primera fase, on s'estableix què ha de fer el programari, no com ho ha de fer.",
    category: "Desenvolupament"
  },
  {
    id: 11,
    question: "Durant quina fase es dissenyen els algorismes del programa?",
    options: [
      "Anàlisi",
      "Disseny",
      "Implementació",
      "Documentació"
    ],
    correct: 1,
    explanation: "Durant la fase de disseny s'estableix com es duran a terme els objectius i es dissenyen els algorismes.",
    category: "Desenvolupament"
  },
  {
    id: 12,
    question: "Què és una variable?",
    options: [
      "Un tipus de dada",
      "Una instrucció de control",
      "Una zona de memòria amb un nom assignat que emmagatzema una dada",
      "Un mecanisme per crear algorismes"
    ],
    correct: 2,
    explanation: "Una variable és una zona de memòria a la qual se li assigna un nom o identificador, on es desa una dada d'un determinat tipus.",
    category: "Variables"
  },
  {
    id: 13,
    question: "Com s'indica l'assignació d'un valor a una variable?",
    options: [
      "variable + valor",
      "variable == valor",
      "variable = valor",
      "variable := valor"
    ],
    correct: 2,
    explanation: "L'assignació es fa utilitzant el signe '=' de dreta a esquerra, com en la majoria dels llenguatges d'alt nivell.",
    category: "Variables"
  },
  {
    id: 14,
    question: "Quin símbol s'utilitza per representar l'inici i fi d'un programa en un diagrama de flux?",
    options: [
      "Rectangle",
      "Rombe",
      "Oval/El·lipse",
      "Paral·lelogram"
    ],
    correct: 2,
    explanation: "Els símbols d'inici i fi utilitzen formes ovalades o el·líptiques.",
    category: "Diagrames de flux"
  },
  {
    id: 15,
    question: "Quin símbol representa una operació de procés en un diagrama de flux?",
    options: [
      "Oval",
      "Rectangle",
      "Rombe",
      "Paral·lelogram"
    ],
    correct: 1,
    explanation: "El símbol de procés utilitza un rectangle per especificar operacions com càlculs aritmètics.",
    category: "Diagrames de flux"
  },
  {
    id: 16,
    question: "Quin símbol s'utilitza per a les operacions d'entrada i sortida?",
    options: [
      "Rectangle",
      "Rombe",
      "Paral·lelogram",
      "Cercle"
    ],
    correct: 2,
    explanation: "Les operacions d'entrada i sortida utilitzen un paral·lelogram per especificar operacions com 'llegir' o 'mostrar'.",
    category: "Diagrames de flux"
  },
  {
    id: 17,
    question: "Quin símbol representa una decisió o condició en un diagrama de flux?",
    options: [
      "Rectangle",
      "Oval",
      "Rombe",
      "Triangle"
    ],
    correct: 2,
    explanation: "El símbol de decisió utilitza un rombe per expressar operacions de comprovació amb resultat cert/fals.",
    category: "Diagrames de flux"
  },
  {
    id: 18,
    question: "Quin operador s'utilitza per comparar igualtat en les condicions?",
    options: [
      "=",
      "==",
      "===",
      ":="
    ],
    correct: 1,
    explanation: "S'utilitza el doble igual '==' per a comparacions, ja que el simple igual '=' es reserva per a assignacions.",
    category: "Diagrames de flux"
  },
  {
    id: 19,
    question: "En un programa amb intents disponibles, quina instrucció resta un intent?",
    options: [
      "intents = -1",
      "intents = -intents",
      "intents - 1",
      "intents = intents - 1"
    ],
    correct: 3,
    explanation: "Per restar un intent, s'utilitza 'intents = intents - 1', assignant el valor actual menys 1.",
    category: "Variables"
  },
  {
    id: 20,
    question: "Què fa l'operador '%' en programació?",
    options: [
      "Calcula el percentatge",
      "Calcula el residu de la divisió",
      "Multiplica per 100",
      "Divideix per 100"
    ],
    correct: 1,
    explanation: "L'operador '%' calcula el residu o mòdul de la divisió entre dos nombres.",
    category: "Operadors"
  }
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === question.correct) {
      setScore(score + 1);
    }

    setShowResult(true);
    setShowExplanation(true);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setShowExplanation(false);
      } else {
        setQuizCompleted(true);
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
    setShowExplanation(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 90) return { message: "Excel·lent! Domines la programació!", icon: Trophy };
    if (percentage >= 70) return { message: "Molt bé! Bon coneixement general!", icon: Brain };
    if (percentage >= 50) return { message: "Aprovat! Continua estudiant!", icon: Code };
    return { message: "Cal reforçar els conceptes bàsics.", icon: Cpu };
  };

  if (quizCompleted) {
    const { message, icon: ScoreIcon } = getScoreMessage();
    
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-primary rounded-full opacity-20 blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-quiz-accent rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-hero rounded-full opacity-10 blur-3xl animate-glow-pulse"></div>
        </div>

        <Card className="w-full max-w-2xl bg-gradient-card border-border shadow-quiz backdrop-blur-sm animate-bounce-in relative z-10">
          <CardHeader className="text-center pb-6 relative">
            {/* Floating decorative elements */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center shadow-glow animate-float-up">
                <ScoreIcon className="w-10 h-10 text-white drop-shadow-lg" />
              </div>
            </div>
            
            <div className="pt-8">
              <div className="flex justify-center space-x-2 mb-4">
                {[...Array(3)].map((_, i) => (
                  <Sparkles key={i} className="w-6 h-6 text-quiz-accent animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              
              <CardTitle className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent animate-gradient-shift mb-2">
                Test Completat!
              </CardTitle>
              
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.ceil((score / quizQuestions.length) * 5) ? 'text-warning fill-warning' : 'text-muted-foreground'} animate-bounce`} style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="text-center space-y-8">
            <div className="space-y-6">
              <div className="relative">
                <div className="text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-bounce-in">
                  {score}/{quizQuestions.length}
                </div>
                <div className="absolute -top-2 -right-2">
                  <Zap className="w-8 h-8 text-warning animate-pulse" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-semibold text-quiz-accent">
                  {Math.round((score / quizQuestions.length) * 100)}% correctes
                </div>
                <div className="text-lg font-medium text-foreground px-4 py-2 bg-muted/50 rounded-full backdrop-blur-sm">
                  {message}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
              <div className="bg-gradient-success rounded-xl p-6 shadow-success transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-1">{score}</div>
                <div className="text-sm text-white/80">Correctes</div>
                <CheckCircle className="w-8 h-8 text-white/60 mt-2" />
              </div>
              <div className="bg-gradient-to-br from-destructive to-red-600 rounded-xl p-6 shadow-error transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-1">{quizQuestions.length - score}</div>
                <div className="text-sm text-white/80">Incorrectes</div>
                <XCircle className="w-8 h-8 text-white/60 mt-2" />
              </div>
            </div>

            <Button 
              onClick={resetQuiz}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 text-lg px-8 py-6 quiz-button"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-3" />
              Tornar a fer el test
              <Sparkles className="w-5 h-5 ml-3" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-20 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-quiz-accent/20 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-success/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-warning/20 rounded-full blur-lg animate-pulse delay-1500"></div>
      </div>

      <Card className="w-full max-w-4xl bg-gradient-card border-border shadow-quiz backdrop-blur-sm animate-float-up relative z-10">
        {/* Header with enhanced visual appeal */}
        <CardHeader className="pb-6 relative overflow-hidden">
          {/* Hero header section */}
          <div className="text-center mb-6 relative">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <BookOpen className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent animate-gradient-shift">
                Test de Programació
              </h1>
              <Code className="w-8 h-8 text-quiz-accent animate-pulse delay-300" />
            </div>
            <p className="text-muted-foreground text-lg">
              Posa a prova els teus coneixements sobre fonaments de programació
            </p>
          </div>

          <div className="flex items-center justify-between mb-6">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-gradient-secondary border-primary/20 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              {question.category}
            </Badge>
            <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full backdrop-blur-sm">
              Pregunta {currentQuestion + 1} de {quizQuestions.length}
            </div>
          </div>
          
          <div className="relative mb-6">
            <Progress 
              value={progress} 
              className="h-3 bg-muted/30 backdrop-blur-sm shadow-inner"
            />
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-primary rounded-full opacity-80 animate-progress" 
                 style={{ width: `${progress}%` }}>
            </div>
          </div>
          
          <CardTitle className="text-2xl font-semibold leading-relaxed text-center bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
            {question.question}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {question.options.map((option, index) => {
              let buttonVariant = "outline";
              let buttonClass = "justify-start text-left h-auto p-6 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 quiz-button relative group";
              
              if (showResult) {
                if (index === question.correct) {
                  buttonVariant = "default";
                  buttonClass += " bg-gradient-success hover:bg-gradient-success animate-pulse-success shadow-success border-success/50";
                } else if (index === selectedAnswer) {
                  buttonVariant = "destructive";
                  buttonClass += " animate-shake-error shadow-error";
                }
              } else if (selectedAnswer === index) {
                buttonClass += " border-primary bg-primary/10 shadow-glow scale-[1.02] -translate-y-1";
              } else {
                buttonClass += " hover:border-primary/50 hover:bg-primary/5 hover:shadow-card";
              }

              return (
                <Button
                  key={index}
                  variant={buttonVariant as any}
                  className={buttonClass}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <div className="flex items-start space-x-4 w-full">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      showResult && index === question.correct ? 'bg-success text-success-foreground border-success' :
                      selectedAnswer === index && !showResult ? 'bg-primary text-primary-foreground border-primary' : ''
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="flex-1 text-sm leading-relaxed">
                      {option}
                    </div>
                    {showResult && index === question.correct && (
                      <CheckCircle className="w-6 h-6 text-success-foreground animate-bounce-in" />
                    )}
                    {showResult && index === selectedAnswer && index !== question.correct && (
                      <XCircle className="w-6 h-6 text-destructive-foreground animate-shake-error" />
                    )}
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </Button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="mt-8 p-6 bg-gradient-secondary rounded-xl border border-primary/20 shadow-card animate-float-up backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-3">
                <Brain className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-primary">Explicació:</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}

          {!showResult && selectedAnswer !== null && (
            <div className="flex justify-center pt-4">
              <Button 
                onClick={handleNextQuestion}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 text-lg px-8 py-6 quiz-button"
                size="lg"
              >
                <Zap className="w-5 h-5 mr-3" />
                {currentQuestion === quizQuestions.length - 1 ? 'Finalitzar Test' : 'Següent Pregunta'}
                <Sparkles className="w-5 h-5 ml-3" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizApp;