﻿i m p o r t   R e a c t   f r o m   ' r e a c t ' ; 
 i m p o r t   {   A l e r t C i r c l e   }   f r o m   ' l u c i d e - r e a c t ' ; 
 
 t y p e   D e l e t e C o n f i r m M o d a l P r o p s   =   { 
     i s O p e n :   b o o l e a n ; 
     o n C l o s e :   ( )   = >   v o i d ; 
     o n C o n f i r m :   ( )   = >   v o i d ; 
     t i t l e ? :   s t r i n g ; 
     m e s s a g e ? :   s t r i n g ; 
 } ; 
 
 e x p o r t   c o n s t   D e l e t e C o n f i r m M o d a l   =   ( {   
     i s O p e n ,   
     o n C l o s e ,   
     o n C o n f i r m , 
     t i t l e   =   " D e l e t e   L e a d " , 
     m e s s a g e   =   " A r e   y o u   s u r e   y o u   w a n t   t o   d e l e t e   t h i s   l e a d ?   T h i s   a c t i o n   c a n n o t   b e   u n d o n e . " 
 } :   D e l e t e C o n f i r m M o d a l P r o p s )   = >   { 
     i f   ( ! i s O p e n )   r e t u r n   n u l l ; 
 
     r e t u r n   ( 
         < d i v   c l a s s N a m e = " f i x e d   i n s e t - 0   b g - b l a c k / 5 0   f l e x   i t e m s - c e n t e r   j u s t i f y - c e n t e r   p - 4 " > 
             < d i v   c l a s s N a m e = " b g - g r a y - 8 0 0   r o u n d e d   p - 4   m a x - w - s m   w - f u l l " > 
                 < d i v   c l a s s N a m e = " f l e x   g a p - 3 " > 
                     < A l e r t C i r c l e   c l a s s N a m e = " w - 6   h - 6   t e x t - r e d - 4 0 0   f l e x - s h r i n k - 0 "   / > 
                     < d i v > 
                         < h 3   c l a s s N a m e = " t e x t - l g   f o n t - m e d i u m   m b - 2 " > { t i t l e } < / h 3 > 
                         < p   c l a s s N a m e = " t e x t - s m   t e x t - g r a y - 4 0 0   m b - 4 " > 
                             { m e s s a g e } 
                         < / p > 
                     < / d i v > 
                 < / d i v > 
 
                 < d i v   c l a s s N a m e = " f l e x   j u s t i f y - e n d   g a p - 2 " > 
                     < b u t t o n 
                         o n C l i c k = { o n C l o s e } 
                         c l a s s N a m e = " b g - g r a y - 7 0 0   t e x t - w h i t e   p x - 4   p y - 2   r o u n d e d   h o v e r : b g - g r a y - 6 0 0 " 
                     > 
                         C a n c e l 
                     < / b u t t o n > 
                     < b u t t o n 
                         o n C l i c k = { ( )   = >   { 
                             o n C o n f i r m ( ) ; 
                             o n C l o s e ( ) ; 
                         } } 
                         c l a s s N a m e = " b g - r e d - 5 0 0   t e x t - w h i t e   p x - 4   p y - 2   r o u n d e d   h o v e r : b g - r e d - 6 0 0 " 
                     > 
                         D e l e t e 
                     < / b u t t o n > 
                 < / d i v > 
             < / d i v > 
         < / d i v > 
     ) ; 
 } ; 
 
 e x p o r t   d e f a u l t   D e l e t e C o n f i r m M o d a l ; 


