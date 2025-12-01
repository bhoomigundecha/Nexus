import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown';

const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
};

function ChapterContent({chapter, content}) {
    console.log('Chapter:', chapter);
    console.log('Content:', content);
    
  return (
    <div className='p-10'>
        <h2 className='font-medium text-2xl'>{chapter?.name}</h2>
        <p className='text-gray-500'>{chapter?.about}</p>
        
        {/* Video */}
        {content?.videoId && (
            <div className='flex justify-center my-6'>
                <YouTube
                    videoId={content?.videoId}
                    opts={opts}
                />
            </div>
        )}

        {/* Content */}
        <div className='mt-6'>
            {!content ? (
                <div className='flex items-center justify-center p-10'>
                    <div className='text-center'>
                        <div className='animate-pulse text-blue-600 text-lg'>
                            Loading chapter content...
                        </div>
                    </div>
                </div>
            ) : content?.content?.length > 0 ? (
                content.content.map((item, index) => (
                    <div key={index} className='p-6 bg-gradient-to-br from-blue-50 to-white shadow-md mb-4 rounded-lg border border-blue-100 hover:shadow-lg transition-shadow'>
                        <h2 className='font-semibold text-xl text-blue-800 mb-3'>{item.title}</h2>
                        <div className='text-base text-gray-800 leading-7 mb-3'>
                            <ReactMarkdown>
                                {item?.explanation || item?.description}
                            </ReactMarkdown>
                        </div>
                        {item.codeExample && (
                            <div className='p-4 bg-gray-900 text-green-400 rounded-lg mt-4 overflow-x-auto font-mono text-sm shadow-inner'>
                                <pre className='whitespace-pre-wrap'>
                                    <code>{item.codeExample.replace('<precode>', '').replace('</precode>', '')}</code>
                                </pre>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                /* Fallback: Show chapter description if no detailed content */
                <div className='p-5 bg-blue-50 shadow-sm mb-3 rounded-lg'>
                    <h2 className='font-medium text-xl'>Chapter Overview</h2>
                    <p className='text-lg text-gray-700 leading-9 mt-2 whitespace-pre-wrap'>
                        {chapter?.about}
                    </p>
                    <div className='mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded'>
                        <p className='text-sm text-blue-800'>
                            💡 Detailed chapter content will be generated when you start learning this chapter.
                        </p>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default ChapterContent