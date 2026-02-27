import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';

interface InteractiveCaptchaProps {
    onVerify: (isValid: boolean) => void;
}

export default function InteractiveCaptcha({ onVerify }: InteractiveCaptchaProps) {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(false);

    const generateChallenge = () => {
        setNum1(Math.floor(Math.random() * 10) + 1);
        setNum2(Math.floor(Math.random() * 10) + 1);
        setUserAnswer('');
        setError(false);
    };

    useEffect(() => {
        generateChallenge();
    }, []);

    const handleCheck = (val: string) => {
        setUserAnswer(val);
        const answer = parseInt(val);
        if (answer === num1 + num2) {
            setIsVerified(true);
            setError(false);
            onVerify(true);
        } else {
            setIsVerified(false);
            if (val.length >= (num1 + num2).toString().length) {
                setError(true);
            } else {
                setError(false);
            }
            onVerify(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-2"
        >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isVerified ? 'bg-[#00FF94]/20 text-[#00FF94]' : 'bg-white/5 text-white/40'}`}>
                        {isVerified ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
                    </div>
                    <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">Security Check</p>
                        <p className="text-sm font-bold text-white flex items-center gap-2">
                            Solve: <span className="text-[#00FF94]">{num1} + {num2}</span> = ?
                        </p>
                    </div>
                </div>

                <div className="relative w-full sm:w-24">
                    <input
                        type="number"
                        value={userAnswer}
                        onChange={(e) => handleCheck(e.target.value)}
                        disabled={isVerified}
                        placeholder="?"
                        className={`w-full bg-black/40 border rounded-xl px-4 py-2 text-center text-sm font-bold text-white transition-all
              ${isVerified ? 'border-[#00FF94] bg-[#00FF94]/10 cursor-default' :
                                error ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 focus:border-[#00FF94]/50'}`}
                    />

                    <AnimatePresence>
                        {isVerified && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute -right-2 -top-2 text-[#00FF94]"
                            >
                                <Sparkles size={16} className="animate-pulse" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {!isVerified && error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] text-red-400 mt-2 font-mono uppercase tracking-tighter"
                >
                    Incorrect answer, try again
                </motion.p>
            )}
        </motion.div>
    );
}
