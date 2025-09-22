import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, Trophy, Brain, Code, Cpu } from 'lucide-react';

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
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-gradient-card border-border shadow-card">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <ScoreIcon className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Test Completat!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-4">
              <div className="text-6xl font-bold text-primary">
                {score}/{quizQuestions.length}
              </div>
              <div className="text-xl text-muted-foreground">
                {Math.round((score / quizQuestions.length) * 100)}% correctes
              </div>
              <div className="text-lg font-medium">
                {message}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="bg-muted rounded-lg p-4">
                <div className="text-2xl font-bold text-success">{score}</div>
                <div className="text-sm text-muted-foreground">Correctes</div>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="text-2xl font-bold text-destructive">{quizQuestions.length - score}</div>
                <div className="text-sm text-muted-foreground">Incorrectes</div>
              </div>
            </div>

            <Button 
              onClick={resetQuiz}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Tornar a fer el test
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-gradient-card border-border shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="px-3 py-1">
              {question.category}
            </Badge>
            <div className="text-sm text-muted-foreground">
              Pregunta {currentQuestion + 1} of {quizQuestions.length}
            </div>
          </div>
          
          <Progress 
            value={progress} 
            className="h-2 mb-4"
          />
          
          <CardTitle className="text-xl font-semibold leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {question.options.map((option, index) => {
              let buttonVariant = "outline";
              let buttonClass = "justify-start text-left h-auto p-4 transition-all duration-300";
              
              if (showResult) {
                if (index === question.correct) {
                  buttonVariant = "default";
                  buttonClass += " bg-success hover:bg-success animate-pulse-success";
                } else if (index === selectedAnswer) {
                  buttonVariant = "destructive";
                  buttonClass += " animate-shake-error";
                }
              } else if (selectedAnswer === index) {
                buttonClass += " border-primary bg-primary/10";
              }

              return (
                <Button
                  key={index}
                  variant={buttonVariant as any}
                  className={buttonClass}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <div className="flex items-start space-x-3 w-full">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="flex-1 text-sm leading-relaxed">
                      {option}
                    </div>
                    {showResult && index === question.correct && (
                      <CheckCircle className="w-5 h-5 text-success-foreground" />
                    )}
                    {showResult && index === selectedAnswer && index !== question.correct && (
                      <XCircle className="w-5 h-5 text-destructive-foreground" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="mt-6 p-4 bg-muted rounded-lg border-l-4 border-l-primary">
              <h4 className="font-medium text-sm mb-2">Explicació:</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}

          {!showResult && selectedAnswer !== null && (
            <Button 
              onClick={handleNextQuestion}
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
              size="lg"
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Finalitzar Test' : 'Següent Pregunta'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizApp;