import {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import {useInjection} from "inversify-react";
import {SERVICE_KEYS} from "../service-keys";
import {ITranslator} from "../services/abstractions/i-translator";
import {ITab, TabGroup} from "./TabGroup";
import '../wwwroot/stylesheets/Translator.css';

const Translator: FC = () => {

    const languageTabs: ITab[] = [{id: 'en', value: 'English'}, {id: 'uk', value: 'Ukrainian'}, {
        id: 'pl', value: 'Polish'
    }, {id: 'af', value: 'Afrikaans'}, {
        id: 'sq', value: 'Albanian'
    }, {
        id: 'am', value: 'Amharic'
    }, {
        id: 'ar', value: 'Arabic'
    }, {
        id: 'hy', value: 'Armenian'
    }, {
        id: 'as', value: 'Assamese'
    }, {
        id: 'az', value: 'Azerbaijani (Latin)'
    },
        {
            id: 'bn', value: 'Bangla'
        }, {
            id: 'ba', value: 'Bashkir'
        }, {
            id: 'eu', value: 'Basque'
        }, {
            id: 'bs', value: 'Bosnian (Latin)'
        }];

    const [sourceLanguage, setSourceLanguage] = useState<string>(languageTabs[0].id.toString());
    const [targetLanguage, setTargetLanguage] = useState<string>(languageTabs[0].id.toString())
    const [textToTranslate, setTextToTranslate] = useState<string>('');
    const [translatedText, setTranslatedText] = useState('');

    const [isTypingNow, setIsTypingNow] = useState<boolean>();
    const typingTimer = useRef<NodeJS.Timeout>();
    const updateTypingState = () => {
        clearTimeout(typingTimer.current);
        setIsTypingNow(true);
        typingTimer.current = setTimeout(() => {
            setIsTypingNow(false);
        }, 1000);
    };

    const onType = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextToTranslate(event.target.value);
        updateTypingState();
    };

    const translator: ITranslator = useInjection<ITranslator>(SERVICE_KEYS.ITranslator);
    useEffect(() => {
        async function fetchResult() {
            setTranslatedText(await translator.translate(sourceLanguage, targetLanguage, textToTranslate));
        }

        if (sourceLanguage !== targetLanguage && textToTranslate.length > 0 && isTypingNow === false) {
            fetchResult();
        }
    }, [translator, sourceLanguage, targetLanguage, textToTranslate, isTypingNow]);

    return (<div className="container-fluid">
        <div className="row">
            <div className="col-md-6">
                <TabGroup tabs={languageTabs}
                          tabChangeHandler={(currentTab: ITab) => setSourceLanguage(currentTab.id.toString())}></TabGroup>
                <div className="form-group">
                    <textarea className="form-control" value={textToTranslate}
                              onChange={onType}/>
                </div>
            </div>
            <div className="col-md-6">
                <TabGroup tabs={languageTabs}
                          tabChangeHandler={(currentTab: ITab) => setTargetLanguage(currentTab.id.toString())}></TabGroup>
                <div className="form-group">
                    <textarea className="form-control" value={translatedText} readOnly/>
                </div>
            </div>
        </div>
    </div>);
};

export default Translator;